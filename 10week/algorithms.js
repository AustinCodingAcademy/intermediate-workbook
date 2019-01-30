"use strict";

const assert = require("assert");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let arr = [];

for (let i = 0; i < 1000; i++) {
  arr.push(getRandomInt(0, 1000));
}

function bubbleSort(arr) {
  // Your code here
  let comparisonCount = 0;
  for (let i = 0; i < arr.length; i++) {
    let swapped = false;
    for (let j = 1; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        comparisonCount++;
        let temp = arr[j + 1];
        arr[j] = arr[j + 1];
        temp = arr[j];
        swapped = true;
      }
    }
    if (swapped) break;
  }
  console.log("TCL: ---------------------------------------------------");
  console.log("TCL: bubbleSort -> comparisonCount", comparisonCount);
  console.log("TCL: ---------------------------------------------------");
  return arr;
}

function mergeSort(arr) {
  // Your code here
}

function binarySearch(arr, item) {
  // Your code here
}

// Tests

if (typeof describe === "function") {
  function comparator(a, b) {
    if (Number(a) < Number(b)) return -1;
    if (Number(a) > Number(b)) return 1;
    return 0;
  }

  describe("#bubbleSort()", () => {
    it("should sort array", () => {
      const sorted = bubbleSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  xdescribe("#mergeSort()", () => {
    it("should sort array", () => {
      const sorted = mergeSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  xdescribe("#binarySearch()", () => {
    it("should return the index of given item if sorted array contains it", () => {
      const idx = binarySearch([1, 2, 3, 4], 3);
      assert.equal(idx, 2);
    });
    it("should return false if item not in sorted array", () => {
      const idx = binarySearch([1, 2, 3, 4], 5);
      assert.equal(idx, false);
    });
  });
} else {
  console.log("Run the tests!");
}
