Создадим простой конфиг для Nginx, который будет отдавать три разных контента по разным путям:

Файл default.conf:
server {
    listen 80;
    server_name nginx.local;

    location /page1 {
        root /usr/share/nginx/html;
        index index.html;
    }

    location /page2 {
        root /usr/share/nginx/html;
        index index.html;
    }

    location /page3 {
        root /usr/share/nginx/html;
        index index.html;
    }
}

Создайте ConfigMap из файла default.conf
kubectl create configmap nginx-config --from-file=default.conf

Создайте HTML-страницы
Создайте папку html/ и внутри неё три файла:

page1/index.html
page2/index.html
page3/index.html
Пример содержимого page1/index.html:

<!DOCTYPE html>
<html>
<head>
  <title>Page 1</title>
</head>
<body>
  <h1>Это страница 1</h1>
</body>
</html>

Также с page2/index.html и page3/index.html с соответствующими заголовками.

Создайте ConfigMap для HTML-страниц
kubectl create configmap nginx-html-page1 --from-file=html/page1/index.html

Сделайте также с nginx-html-page2 и nginx-html-page3

Создайте манифест nginx-deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
        volumeMounts:
        - name: nginx-config
          mountPath: /etc/nginx/conf.d
        - name: nginx-html-page1
          mountPath: /usr/share/nginx/html/page1
        - name: nginx-html-page2
          mountPath: /usr/share/nginx/html/page2
        - name: nginx-html-page3
          mountPath: /usr/share/nginx/html/page3
      volumes:
      - name: nginx-config
        configMap:
          name: nginx-config
      - name: nginx-html-page1
        configMap:
          name: nginx-html-page1
      - name: nginx-html-page2
        configMap:
          name: nginx-html-page2
      - name: nginx-html-page3
        configMap:
          name: nginx-html-page3
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80


Проверьте, что всё запустилось
kubectl get pods
kubectl get services

Примерно должно быть так:
NAME             TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)                AGE
nginx-service   NodePort   10.43.12.34    <none>        80:(тут ваш IP)/TCP     2m


Теперь откройте:
http://<тут ваш IP>:31234/page1
