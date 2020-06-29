package com.company;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class OrangeLabsTest {

    private static void print_line() {
        System.out.println();
        System.out.println("*****************************************************************************************************************************");
    }

    public static int largest_number_of_words(String S) {
        String[] sentences = S.split("[.!?]");
       List<List<String>>listofwords=new ArrayList<>();
       Arrays.stream(sentences).forEach(s -> {
            String words[]=s.split("\\s+");//split by space use this  or s.split(" ");
           List<String>lwords=new ArrayList<>();

            Arrays.stream(words).forEach(word->{

                lwords.add(word);
            });
            listofwords.add(lwords);
        });
      System.out.println(listofwords);
      int largest_number_of_words_in_sentence=0;
      for(List<String>l:listofwords){
          if(l.size()>largest_number_of_words_in_sentence){
              largest_number_of_words_in_sentence=l.size();
          }
      }
        return largest_number_of_words_in_sentence;
    }

    public static void main(String args[]) {
        print_line();
        String text="aa ff dd ee dd.dddd tttt.gggd ddde eeee?ddddggg dd eee!ddd";
       System.out.println( largest_number_of_words(text));
    }
}
