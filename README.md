# IsPrimeNumber

素数かどうかを判定するプログラム。
自分が一番最初に勉強した???プログラミング言語であるPHPで実装する。
※ Python(javaScript)説あり。  

## 実行方法

```shell
docker build -t is-prime-number . && docker run -p 80:80 -it -rm --name my-is-prime-number is-prime-number
```

## 自分用メモ

- `/usr/sbin/apache2ctl restart`でコンテナ内からApacheをリスタートできる。
- php_gmpを使用するには`php-gmp`をインストールして、`php.ini`に`extension=gmp`を追加する。

```shell
# Apacheの実行・リスタート・中断
/usr/sbin/apache2ctl start
/usr/sbin/apache2ctl restart
/usr/sbin/apache2ctl stop
```
