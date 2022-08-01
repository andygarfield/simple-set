import { inspect } from "util";

export class SimpleSet {
  #values = new Map();
  length = 0;

  constructor(arr = []) {
    arr.forEach((item) => {
      this.add(item);
    });
  }

  toArray() {
    return Array.from(this.#values.keys());
  }

  has(item) {
    return this.#values.has(item);
  }

  add(item) {
    if (!this.has(item)) {
      this.#values.set(item, null);
      this.length++;
    }
    return this;
  }

  remove(item) {
    if (this.has(item)) {
      this.#values.delete(item);
      this.length--;
    }
    return this;
  }

  equals(otherSet) {
    if (otherSet.length !== this.length) {
      return false;
    }

    for (const item of this.toArray()) {
      if (!otherSet.has(item)) {
        return false;
      }
    }

    return true;
  }

  union(otherSet) {
    return new this.constructor([...this.toArray(), ...otherSet.toArray()]);
  }

  intersect(otherSet) {
    return new this.constructor(
      this.toArray().filter((item) => otherSet.has(item))
    );
  }

  minus(otherSet) {
    return new this.constructor(
      this.toArray().filter((item) => !otherSet.has(item))
    );
  }

  [inspect.custom](depth, opts) {
    return this.toString();
  }

  toString() {
    const str = this.toArray()
      .map((item) => String(item))
      .join(", ");

    return `SimpleSet { ${str} }`;
  }
}
