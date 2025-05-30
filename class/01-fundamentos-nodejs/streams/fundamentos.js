// Netflix & Spotify

// Importação de clientes via CSV (Excel)
// 1gb - 1.000.000
// POST - upload import.csv

// 10mb/s - 100ms

// 100s -> Inserção no banco de dados

// 10mbs -> 10.000

// Readable Streams / Writable Streams

// process.stdin
// .pipe(process.stdout)

import { Readable, Writable, Transform } from "node:stream";

class OneToHundreadStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundreadStream() //ler
  .pipe(new InverseNumberStream()) //transformar
  .pipe(new MultiplyByTenStream()); //escrever
