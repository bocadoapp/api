# Backend

Backend generat amb nodejs i [typescript](https://www.typescriptlang.org/). Com que fem us de typescript, el codi s'ha de compilar.
Encara he d'acabar de comentar codi, pero de moment amb aixo hauries de poder comencar

---

⚠️ No estan permesos `push` directes a master. Ho fem amb PRs, ja que a cada push/merge es dispara un deploy a Heroku

---

## Instal.lar

Assumim que `nodejs>=10` & `npm>=6` estan instal.lats

- Clone: `git clone git@github.com:bocadoapp/api.git`
- Crear `.env` en base a `.env.example` (demanem les keys per xat i t'ho passo)
- Anem al directori i instal.lem les dependencies: `cd app && npm i`

## Development

`npm run dev`

## Esctructura

- **`/dist`**: Aqui es on va el codi compilat. A heroku es serveixen els arxius d'aqui. En local els de `src`.
- **`/node_modules`**: Aqui es guarden les dependencies, res a fer-hi.
- **`/scripts`**: Aqui hi estic guardant processos que corro en local, scrapper d'ingredients, importar a la bd CSVs etc... Res d'aqui es accessible desde REST/graphql
- **`/src`**: Aqui es on hi va tot el codi de la api/graphql.
   - **`/src/graphql`**:
   - **`/src/models`**:
   - **`/src/rest`**:


