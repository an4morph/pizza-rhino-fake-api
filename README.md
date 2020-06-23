# Fake api for pizza delivery app

### Start as dev

```sh
npm start
```


Before first start - install all dependencies

```sh
npm install
```

Run at 1717 port

Auth header: `X-Auth:  ${your_token}`

### Routes

> `GET` /me


> `POST` /login

```sh
body: {
  username: string (required),
  password: string (required),
}
```


> `POST` /signup

```sh
body: {
  username: string (required),
  password: string (required),
}
```

> `POST` /change-password

```sh
body: {
  id: string (required),
  newPassword: string (required),
}
```