function generateStringToInt(key, size) {
    console.log(key, size)
    let hash = 17;
    for (let i=0; i < key.length; i++) {
        hash = (13 * hash * key.charCodeAt(i)) % size;
    }
    return hash;
}

class HashTable {
    table = new Array(2);
    numberOfItems = 0;

    resize() {
        const newTable = new Array(this.table.length * 2);
        this.table.forEach((items) => {
            if (items) {
                items.forEach(([key, value]) => {
                    const numberedKey = generateStringToInt(key, newTable.length);
                    if (newTable[numberedKey]) {
                        newTable[numberedKey].push([key, value]);
                    } else {
                        newTable[numberedKey] = [[key, value]];
                    }
                })
            }
        })
        this.table = newTable;
    }
    
    setItem(key, value) {
        this.numberOfItems++;
        const ratio = this.numberOfItems / this.table.length;
        if (ratio > 0.8) {
            this.resize();
        }
        const numberedKey = generateStringToInt(key, this.table.length);
        if (this.table[numberedKey]) {
            this.table[numberedKey].push([key, value]);
        } else {
            this.table[numberedKey] = [[key, value]];
        }
    }

    getItem(key) {
        const numberedKey = generateStringToInt(key, this.table.length);
        if (!this.table[numberedKey]) {
          return null;
        }
        return this.table[numberedKey].find((i) => i[0] === key)[1]
    }
}

const table = new HashTable();
table.setItem('FirstName', 'vimal');
table.setItem('LastName', 'raj');
table.setItem('age', 28);
table.setItem('dob', '2/2/2');
console.log('table: ', table.table);
console.log(table.getItem('LastName'));
