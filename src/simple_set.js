import { inspect } from "util";

/**
 * A proof-of-concept set implemented in JavaScript.
 * @template [T=any]
 */
export class SimpleSet {
    #values = new Map();
    length = 0;

    /**
     * Create a new instance of SimpleSet
     * @param {T[]} arr - The array to base the set off of.
     */
    constructor(arr = []) {
        arr.forEach((item) => {
            this.add(item);
        });
    }

    /**
     * Convert the set to an array.
     * @return {T[]} A Point object.
     */
    toArray() {
        return Array.from(this.#values.keys());
    }

    /**
     * Check whether the set contains an item.
     * @param {T} item - The item to check.
     * @returns {bool} Whether the item is in the set.
     */
    has(item) {
        return this.#values.has(item);
    }

    /**
     * Add an item to the set.
     * @param {T} item - The item to add.
     */
    add(item) {
        if (!this.has(item)) {
            this.#values.set(item, null);
            this.length++;
        }
        return this;
    }

    /**
     * Remove an item from the set.
     * @param {T} item - The item to remove.
     */
    remove(item) {
        if (this.has(item)) {
            this.#values.delete(item);
            this.length--;
        }
        return this;
    }

    /**
     * Whether the set contains the same items as another set.
     * @param {this} otherSet - The set to compare against.
     * @returns {bool} Whether the sets are equivalent.
     */
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

    /**
     * Create a new set which combines the current set with another.
     * @param {this} otherSet - The set to combine the current set with.
     * @returns {this} The unioned set.
     */
    union(otherSet) {
        return new this.constructor([...this.toArray(), ...otherSet.toArray()]);
    }

    /**
     * Create a new set which contains the common items of this set and another.
     * @param {this} otherSet - The set to intersect with.
     * @returns {this} The intersected set.
     */
    intersect(otherSet) {
        return new this.constructor(
            this.toArray().filter((item) => otherSet.has(item))
        );
    }

    /**
     * Create a new set which doesn't contain the items from another set.
     * @param {this} otherSet - The set to subtract from the current set.
     * @returns {this} The new set
     */
    minus(otherSet) {
        return new this.constructor(
            this.toArray().filter((item) => !otherSet.has(item))
        );
    }

    [inspect.custom](depth, opts) {
        return this.toString();
    }

    [Symbol.iterator]() {
        return this.#values.keys();
    }

    /**
     * Create a string representation of the set.
     * @returns {string} The string representation.
     */
    toString() {
        const str = this.toArray()
            .map((item) => String(item))
            .join(", ");

        return `SimpleSet { ${str} }`;
    }
}
