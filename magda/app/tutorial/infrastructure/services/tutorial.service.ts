import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  //for static data
  constructor(){}

  private paragraphs:MyParagraph[]=[new MyParagraph('first paragraph','Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo.\n' +
    '  Atqui causae gloriatur ius te, id agam omnis evertitur eum. ' +
    'Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.'),
    new MyParagraph('second paragraph','Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo.\n' +
      '  Atqui causae gloriatur ius te, id agam omnis evertitur eum. ' +
      'Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.'),
    new MyParagraph('third paragraph','Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo.\n' +
      '  Atqui causae gloriatur ius te, id agam omnis evertitur eum. ' +
      'Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.'),
    new MyParagraph('fourth paragraph','Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo.\n' +
      '  Atqui causae gloriatur ius te, id agam omnis evertitur eum. ' +
      'Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.')]

  private paragraphs2:MyParagraph[]=[new MyParagraph('first paragraph','Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo.\n' +
    '  wwwwww te, id agam omnis evertitur eum. ' +
    'ramAffert labous repudiandae nww.'),
    new MyParagraph('second paragraph','Lorem ipsum wt quo.\n' +
      '  Atqui causae gloriatur ius te, id agam omnis evertitur eum.s.'),
    new MyParagraph('third paragraph','Lorem ipsum  voluptatibus.'),
    new MyParagraph('fourth paragraph','الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله الله\n' +
      '\n')]

  private links:MyLink[]=[new MyLink('','A',this.paragraphs),new MyLink('','B',this.paragraphs2)]
  private links2:MyLink[]=[new MyLink('','b',this.paragraphs),new MyLink('','c',this.paragraphs2)]

  public tabs:MyTab[]=[new MyTab('Saber',this.links),new MyTab('Ameen',this.links2)]

  new_tab:Subject<MyTab>=new Subject<MyTab>();


}

//-----------------------------------

///////////////////////////
export class MyTab {
  public title: string;
  public links:MyLink[]=[];
  constructor(title:string,links?:MyLink[]) {
    this.title=title;
    this.links=links;
  }
}
//////////
export class MyLink {
  public  tab:string='';
  public label:string='';
  public paragraphs?:MyParagraph[]=[];

  constructor(tab:string,label:string,paragraphs?:MyParagraph[]) {
    this.tab=tab;
    this.label=label;
    this.paragraphs=paragraphs;

  }

}
/////////
export class MyParagraph {
  constructor(public tab?:string,
              public link?:string,
              public header?:string,
              public paragraph?:string,
              public file?:string){}
}

