package com.company;

public class SwipWithoutTemp {

    private static void swap(int a,int b){
        System.out.println("Befor Swaping a = "+a+" , b="+b);
        a+=b;
        b=a-b;
        a=a-b;
        System.out.println("After Swaping a = "+a+" , b="+b);

    }
//Important Side Note
    //If main() method Is private It wont run
    public static void main(String args[]){
        swap(4,5);
    }
}
