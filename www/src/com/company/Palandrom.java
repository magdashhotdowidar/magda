package com.company;

import java.util.Scanner;

public class Palandrom {
    private static void achieve_palandrom(String text){
        boolean ispalandrom=true;
        for (int x=0,y=text.length()-1;x<text.length();x++,y--){
         if (text.charAt(x)!=text.charAt(y)){
             ispalandrom=false;}
         break;
        }
        if(ispalandrom)System.out.println("The Word Is Palandrom");
        else System.out.println("The Word Is Not Palandrom");
    }

    public  static void main(String args[]){
        Scanner input = new Scanner(System.in);
        System.out.print("Enter The Word : ");
        String text= input.nextLine();
        achieve_palandrom(text);

    }
}
