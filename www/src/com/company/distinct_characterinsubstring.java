package com.company;

import java.util.*;
import java.util.stream.Collectors;

public class distinct_characterinsubstring {
    public static int finddistincet(String a) {
        int sum=0;

        for (int y = 1; y <= a.length(); y++) {
            String subString = a.substring(0, y);
            Set<Character>set=new HashSet<>();
           for(char c:subString.toCharArray())set.add(c);
          sum+=set.size();
        }
        return sum;
    }

    public static void main(String[] args) {
        String s = "aabssdww";

        System.out.println("the number is: " + finddistincet(s));

    }
}
