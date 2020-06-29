package com.company;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class find_number_of_duplication {

    private static void print_line(){
        System.out.println("*****************************************************************************************************************************");
    }

    public static void wordsaccuresfunc() {
        String text = "allah allah allah allah akbar akbar akbar el hamdo le laah" +
                "allahhoma laka el hamed,el shukr";

        String[] words = text.split("[ \n\t\r.,;:!?(){]");
        Map<String, Integer> wordsaccures = new HashMap<>();

        Arrays.stream(words).forEach(s -> {
            Integer value = wordsaccures.get(s);
            if (value == null) wordsaccures.put(s, 1);
            else wordsaccures.put(s, ++value);
        });


        print_map(wordsaccures);
    }

    private static void print_map(Map<String, Integer> map) {
        map.forEach((s, v) -> {
            if (v == 1) System.out.println(s);
            else {
                System.out.print(v+"_");
                System.out.println(s);
            }
        });
    }


    public static void main(String args[]) {
        print_line();
        wordsaccuresfunc();
    }


}
