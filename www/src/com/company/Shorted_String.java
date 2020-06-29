package com.company;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Shorted_String {
    /* Java program to find the length of the smallest
substring consisting of maximum distinct characters */

    static int max_distinct_char(String str) {
        Set<Character> set = new HashSet<>();
        for (char c : str.toCharArray()) set.add(c);
        return set.size();
    }

    static Object[] smallesteSubstr_maxDistictChar(String str) {
        Object[] data = new Object[2];
        String minstr = "";
        int minl = str.length();
        int max_distinct = max_distinct_char(str);

        for (int i = 0; i < minl; i++) {
            for (int j = 0; j < minl; j++) {

                String subs = "";
                if (i < j)
                    subs = str.substring(i, j);
                else
                    subs = str.substring(j, i);
                int subs_lenght = subs.length();
                int sub_distinct_char = max_distinct_char(subs);

                if (subs_lenght < minl && max_distinct == sub_distinct_char) {
                    data[0] = subs_lenght;
                    data[1] = subs;
                }
            }
        }
        return data;
    }

    /* Driver program to test above function */
    static public void main(String[] args) {
        // Input String
        String str = "dddggeeqgqq";

        int len = (int) smallesteSubstr_maxDistictChar(str)[0];
        String minstr = (String) smallesteSubstr_maxDistictChar(str)[1];
        System.out.println(" The length of the smallest substring"
                + " consisting of maximum distinct "
                + "characters : " + len);
        System.out.println(" The  smallest substring"
                + " consisting of maximum distinct "
                + "characters : " + minstr);
    }
}
