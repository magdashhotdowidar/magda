package com.company;

import java.util.*;
import java.util.stream.Collectors;

public class find_the_positive_num {
    //find the greatest positive number or the missing positive or one if all array elements are negative
    private static void print_line(){
        System.out.println("*****************************************************************************************************************************");
    }

    public static int findpositive(Integer[] a) {
          Set<Integer>set= Arrays.stream(a).sorted().filter(i -> i > 0).collect(Collectors.toSet());
        List<Integer> list =set.stream().collect(Collectors.toList());
      //  list.addAll(set); or this way is also true
        System.out.println(list);
        if (list.isEmpty())return 1;
       else
            for (int y = list.get(0), x = 0; y <= list.get(list.size() - 1); y++, x++) {
                if (list.get(x) != y) return y;

                else if (y == list.get(list.size() - 1) && list.get(x) == y) return list.get(list.size() - 1) + 1;
            }
        return 8888;
    }

    public static void main(String[] args) {
        print_line();
        Integer a[] = {5, 7,  8,8,8,10, 6, 9,12,11,};
        Integer b[] = {-1, -2};
        System.out.println("the number is: " + findpositive(a));

    }
}
