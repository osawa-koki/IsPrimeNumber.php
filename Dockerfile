FROM ubuntu:20.04

# Install Apache and PHP
RUN apt-get update && \
    apt-get install -y apache2 && \
    apt-get install -y php libapache2-mod-php

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy PHP code to Apache web root
COPY wwwroot/ /var/www/html/

# Expose Apache on port 80
EXPOSE 80

# Start Apache when the container is launched
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
