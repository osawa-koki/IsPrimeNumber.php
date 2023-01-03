# Step 1: Build the Next.js app
FROM node:18.11.0-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY client/package.json client/package-lock.json ./

# Install the dependencies
RUN yarn

# Copy the rest of the code
COPY client .

# Build the Next.js app
RUN yarn build

##### ##### ##### ##### #####

FROM ubuntu:20.04

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# Update package manager database
RUN apt-get update

# Install Apache and PHP
RUN apt-get install -y apache2 && \
    apt-get install -y php libapache2-mod-php && \
    apt-get install -y php-gmp

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy PHP code to Apache web root
COPY wwwroot/ /var/www/html/

# Expose Apache on port 80
EXPOSE 80

COPY php.ini /etc/php/7.4/cli/php.ini
COPY apache2.conf /etc/apache2/apache2.conf
RUN rm -f /var/www/html/index.html

COPY --from=build-stage /app/dist /var/www/html

# Start Apache when the container is launched
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
