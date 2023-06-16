import assert from "assert";
import { SimpleSet } from "../src/simple_set.js";

describe("SimpleSet", () => {
    describe("toArray", () => {
        it("should return nothing when set is empty", () => {
            const s = new SimpleSet();
            assert.deepEqual(s.toArray(), []);
            assert.equal(s.length, 0);
        });

        it("should return the array we give it", () => {
            let arr = [1, 3, 4];
            let s = new SimpleSet(arr);
            assert.deepEqual(s.toArray(), arr);
            assert.equal(s.length, 3);

            arr = [1, "foo", { bar: 1 }];
            s = new SimpleSet(arr);
            assert.deepEqual(s.toArray(), arr);
            assert.equal(s.length, 3);
        });
    });

    describe("has", () => {
        it("contains the values it was initialized with", () => {
            const s = new SimpleSet([1, 3, 4]);
            assert.equal(s.has(1), true);
            assert.equal(s.has(3), true);
            assert.equal(s.has(4), true);
            assert.equal(s.length, 3);
        });

        it("does contain added values", () => {
            let s = new SimpleSet();
            s = s.add(1);
            s = s.add(3);
            s = s.add(3);
            s = s.add(4);
            assert.equal(s.has(1), true);
            assert.equal(s.has(3), true);
            assert.equal(s.has(4), true);
            assert.equal(s.length, 3);
        });

        it("doesn't contain the removed values", () => {
            let s = new SimpleSet([1, 3, 4]);
            s = s.remove(1);
            s = s.remove(3);
            s = s.remove(4);
            s = s.remove(4);
            assert.equal(s.has(1), false);
            assert.equal(s.has(3), false);
            assert.equal(s.has(4), false);
            assert.equal(s.length, 0);
        });
    });

    describe("add", () => {
        it("adds to the set", () => {
            let s = new SimpleSet([1, 3, 4]);
            s = s.add(5);
            assert.equal(s.has(5), true);
            assert.equal(s.has(6), false);
            assert.equal(s.length, 4);
        });
    });

    describe("remove", () => {
        it("removes from the set", () => {
            let s = new SimpleSet([1, 3, 4]);
            s = s.remove(3);
            assert.equal(s.has(3), false);
            assert.equal(s.has(1), true);
            assert.equal(s.has(4), true);
            assert.equal(s.length, 2);
        });
    });

    describe("equals", () => {
        it("isn't equivalent", () => {
            const s1 = new SimpleSet([1, 3, 4]);
            const s2 = new SimpleSet([3, 4, 5]);
            assert.equal(s1.equals(s2), false);
        });

        it("is equivalent", () => {
            const s1 = new SimpleSet([1, "foo", "bar"]);
            const s2 = new SimpleSet(["bar", "foo", 1]);
            assert.equal(s1.equals(s2), true);
        });
    });

    describe("union", () => {
        it("unions the sets together", () => {
            const s1 = new SimpleSet([1, "foo", 4, 3]);
            const s2 = new SimpleSet([2, 3, 6]);
            const expected = new SimpleSet([1, 2, 3, 4, 6, "foo"]);
            assert.equal(s1.union(s2).equals(expected), true);
        });
    });

    describe("intersect", () => {
        it("intersects the sets together", () => {
            const s1 = new SimpleSet([1, "foo", 2, 4, 3]);
            const s2 = new SimpleSet([2, 3, 6]);
            const expected = new SimpleSet([2, 3]);
            assert.equal(s1.intersect(s2).equals(expected), true);
        });
    });

    describe("minus", () => {
        it("subtracts one set from the other", () => {
            const s1 = new SimpleSet([1, "foo", 2, 4, 3]);
            const s2 = new SimpleSet([2, 3, 6]);

            let expected = new SimpleSet([1, "foo", 4]);
            assert.equal(s1.minus(s2).equals(expected), true);

            expected = new SimpleSet([6]);
            assert.equal(s2.minus(s1).equals(expected), true);
        });
    });

    describe("toString", () => {
        it("converts to a string", () => {
            const s = new SimpleSet([1, "foo", 2, 4, 3]);
            const expected = "SimpleSet { 1, foo, 2, 4, 3 }";
            assert.equal(s.toString(), expected);
        });
    });

    describe("iterator", () => {
        it("iterates through the set", () => {
            const s = new SimpleSet([1, "foo", 2, 4, 3]);
            const compareAgainst = new SimpleSet();
            
            for (let item of s) {
                compareAgainst.add(item);
            }

            assert.ok(s.equals(compareAgainst));
        });
    });
});
