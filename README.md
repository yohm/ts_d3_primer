*WORK IN PROGRESS*

# A minimal sample of d3.js using TypeScript

d3.js primer using TypeScript.

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

## showing the results

Compile ts file.

```
tsc *.ts
```

If you give a `-w` option, the change of the file is monitored and automatically compiled whenever you edit the file.

```
tsc -w *.ts
```

Run `http-server` and access http://localhost:8080

