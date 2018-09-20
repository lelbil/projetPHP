FROM php:7-apache
RUN apt-get update \
	&& apt-get upgrade -y \
	&& apt-get install -y libicu-dev \
	&& docker-php-ext-install pdo_mysql \
	&& a2enmod rewrite
