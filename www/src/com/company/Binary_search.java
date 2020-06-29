package com.company;

import java.util.*;


public class Binary_search {
    private static void print_line() {
        System.out.println();
        System.out.println("*****************************************************************************************************************************");
    }
///////////////////////////////////////////////////////////

    // Java program to demonstrate working of Arrays.
// binarySearch() in a sorted array.

    private static void ArraysBinarySearch() {
        {
            int arr[] = {10, 20, 15, 22, 35};
            Arrays.sort(arr);

            int key = 22;
            int res = Arrays.binarySearch(arr, key);
            if (res >= 0)
                System.out.println(key + " found at index = "
                        + res);
            else
                System.out.println(key + " Not found");

        }
    }
    ///////////////////////////////////////////////////////////
// Java program to demonstrate working of Collections.
// binarySearch()

    private static void CollectionBinarySearch() {

        List<Integer> al = new ArrayList<Integer>();
        al.add(1);
        al.add(2);
        al.add(3);
        al.add(10);
        al.add(20);

        // 10 is present at index 3.
        int key = 10;
        int res = Collections.binarySearch(al, key);
        if (res >= 0)
            System.out.println(key + " found at index = "
                    + res);
        else
            System.out.println(key + " Not found");

    }
    ///////////////////////////** USE Loop(while)//////////////////////////////////////
   private static int binarySearch_use_loop(int arr[], int x)
    {
        int l = 0, r = arr.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;

            if (arr[m] == x)
                return m;

            if (arr[m] < x)
                l = m + 1;

            else
                r = m - 1;
        }

        return -1;
    }

    ///////////////////////////** USE Recursive function//////////////////////////////////////
    private static int binarySearch(int arr[], int l, int r, int x)
    {
        if (r >= l) {
            int mid = l + (r - l) / 2;
            if (arr[mid] == x)
                return mid;
            if (arr[mid] > x)
                return binarySearch(arr, l, mid - 1, x);
            return binarySearch(arr, mid + 1, r, x);
        }
        return -1;
    }
    /////////////////////////////////////////////////////////////
    private static int find(int[] elements, int element) {
        int begin = 0, end = elements.length - 1;

        //Arrays.stream(elements).sorted().forEach(value -> System.out.print(value + ","));
        Arrays.sort(elements);

      return   binarySearch(elements,begin,end,element);

    }

    public static void main(String args[]) {
        print_line();
        int elements[] = {1, 9, 4, 5, 6, 3};
        Arrays.stream(elements).sorted().forEach(value -> System.out.print(value + ","));
        System.out.println();
     //int  result=find(elements,9);
        int result=binarySearch_use_loop(elements,4);
        if (result == -1)
            System.out.println("Element not present");
        else
            System.out.println("Element found at index " + result);

        print_line();
    }
}
