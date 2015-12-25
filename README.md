# A minimal sample of d3.js using TypeScript

Minimal setup of d3.js using TypeScript.

## Preparation

Install typescript, http-server, and tsd.

```
npm install -g typescript http-server tsd
```

Install typescript definition file for d3.

```
tsd install
```

The definition file is saved in `typings/d3` directory.

(Optional) If you a definition file for another library, install using a command like the following.

```
tsd install jquery --save
```

## showing the results

Compile ts file.

```
tsc hello.ts
```

If you give a `-w` option, the change of the file is monitored and automatically compiled whenever you edit the file.

```
tsc -w hello.ts
```

Run `http-server` and access http://localhost:8080

