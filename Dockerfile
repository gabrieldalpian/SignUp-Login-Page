# ===== STAGE 1: Build JAR =====
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# ===== STAGE 2: Run App =====
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/target/login-auth-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]