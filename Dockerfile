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

# Install build tools and GMP(GNU Multiple Precision) library
RUN apt-get update && \
    apt-get install -y build-essential && \
    apt-get install -y libgmp-dev && \
    apt-get install -y wget

# Download PHP source code
RUN wget https://www.php.net/distributions/php-7.4.12.tar.gz && \
    tar xvzf php-7.4.12.tar.gz

# Build PHP with GMP(GNU Multiple Precision) library
WORKDIR /php-7.4.12
RUN ./configure --enable-gmp --with-gmp && \
    make && \
    make install

# Set PHP configuration
COPY php.ini /usr/local/lib/php.ini

# Set Apache configuration
COPY apache2.conf /etc/apache2/apache2.conf

# Set the timezone
RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# Update package manager database
RUN apt-get update

# Install Apache and PHP
RUN apt-get install -y apache2 && \
    apt-get install -y php libapache2-mod-php

# Enable Apache mod_rewrite
RUN a2enmod rewrite && \
    a2enmod headers

# Copy PHP code to Apache web root
COPY wwwroot/ /var/www/html/

# Expose Apache on port 80
EXPOSE 80

RUN apt-get install -y php-gmp
COPY php.ini /etc/php/7.4/cli/php.ini
COPY apache2.conf /etc/apache2/apache2.conf
RUN rm -f /var/www/html/index.html

# Start Apache when the container is launched
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
