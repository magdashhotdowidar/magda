package com.company;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

public class AppleTree {
 /*   Integer sum = integers.stream()
            .reduce(0, (a, b) -> a + b);
    Integer sum = integers.stream()
            .reduce(0, Integer::sum);
    Integer sum = integers.stream()
            .collect(Collectors.summingInt(Integer::intValue));*/

/*    private static void myTreeAppleFunc(int[] apples_on_theTrees, int firstPerson_levels, int secondPerson_levels) {
        int maxforFirst = 0;
        int maxforSecond = 0;
        for (int x = 0; x < apples_on_theTrees.length; x++) {
            int apple_onTheTree = 0;
            if (x <= apples_on_theTrees.length - firstPerson_levels)
                for (int y = x; y < x + firstPerson_levels; y++) {
                    apple_onTheTree += apples_on_theTrees[y];
                }
            if (maxforFirst < apple_onTheTree) maxforFirst = apple_onTheTree;

            apple_onTheTree = 0;

            if (x <= apples_on_theTrees.length - secondPerson_levels)
                for (int y = x + firstPerson_levels; y < x + secondPerson_levels; y++) {
                    apple_onTheTree += apples_on_theTrees[y];
                }

            if (maxforSecond < apple_onTheTree) maxforSecond = apple_onTheTree;
        }
        System.out.println("THE MAX NUMBER OF APPLES CAN BE COLLECT BY THE TO PERSON IS : " +
                (maxforFirst + maxforSecond));

    }*/

    private static void myTreeAppleFunc(int[] apples_on_theTrees, int firstPerson_level, int secondPerson_level) {
        List<List<Integer>> firstPerson_Intervals = new ArrayList<>();
        List<List<Integer>> secondPerson_Intervals = new ArrayList<>();

        for (int x = 0; x < apples_on_theTrees.length; x++) {
            List<Integer> interval = new ArrayList<>();

            if (x <= apples_on_theTrees.length - firstPerson_level)
                for (int y = x; y < x + firstPerson_level; y++) {
                    interval.add(apples_on_theTrees[y]);
                }
            if (!interval.isEmpty())
                firstPerson_Intervals.add(interval);

            interval = new ArrayList<>();
            if (x <= apples_on_theTrees.length - secondPerson_level)
                for (int z = x; z < x + secondPerson_level; z++) {
                    interval.add(apples_on_theTrees[z]);
                }
            if (!interval.isEmpty())
                secondPerson_Intervals.add(interval);
        }

        final int[] maxValue = {Integer.MIN_VALUE};

        firstPerson_Intervals.forEach(i -> {
            secondPerson_Intervals.forEach(j -> {
                final Boolean[] contain = {Boolean.FALSE};
                i.forEach(x -> {
                    if (j.contains(x)) contain[0] = Boolean.TRUE;
                });
                int firstMax = i.stream().reduce(0, Integer::sum);
                int secondMax = j.stream().reduce(0, Integer::sum);
                int sumFS = firstMax + secondMax;
                if (!contain[0] && sumFS > maxValue[0]) maxValue[0] = sumFS;
            });
        });
        System.out.println("THE INTERVALS FOR THE FIRST ONE : " + firstPerson_Intervals);
        System.out.println("THE INTERVALS FOR THE SECOND ONE : " + secondPerson_Intervals);
        System.out.println("THE MAX APPLE NUMBER CAN BE COLLECT BY THE BOTH IS : " + maxValue[0]);

    }

    public static void main(String args[]) {
        int[] apples_on_theTrees = {1, 3, 8, 6, 7, 2, 1};
        int firstPerson_level = 3;
        int secondPerson_level = 2;
        myTreeAppleFunc(apples_on_theTrees, firstPerson_level, secondPerson_level);

    }


}
