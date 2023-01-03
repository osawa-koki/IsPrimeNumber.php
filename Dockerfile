FROM ubuntu:20.04

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# Update package manager database
RUN apt-get update

# Install Apache and PHP
RUN apt-get install -y apache2 && \
    apt-get install -y php libapache2-mod-php

# Enable Apache mod_rewrite
RUN a2enmod rewrite

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
