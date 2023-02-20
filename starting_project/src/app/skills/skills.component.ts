import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { Skill } from '../model/skill.model';
import { SkillService } from '../service/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  
  SkillDetail !: FormGroup;
  SkillList : Skill[] = [];
  DAS : any;
  display = false;
  userId : string ='';
  p: number=1;
  key : string='DAS';
  reverse : boolean = false;

  constructor(private route: ActivatedRoute,private formBuilder : FormBuilder, private skillService : SkillService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.userId = params.get('id') || '';

      

    });

    
    this.getAllSkills();
    

    this.SkillDetail = this.formBuilder.group({
      
      SKILLS_ID : [''],
      ID : [''],
      DAS : [''],
      ACADEMY: [''],
      K8S: [''],
      NETWORKING : [''],
      JIRA : ['']
     
      
    }); 
  }

 

  getAllSkills() {
    this.skillService.getAllSkills().subscribe((res: Skill[])=>{
        this.SkillList = res;
    });
  }

  Search() {
    if(this.DAS == ''){
      this.getAllSkills()
    }else {
      this.SkillList = this.SkillList.filter(res => {
        return res.DAS.toLocaleLowerCase().match(this.DAS.toLocaleLowerCase());
      })
    }
  }
  
  sort(key: any) {
    this.key =key;
    this.reverse= !this.reverse;
  }

  editSkill(skill : Skill) {
    this.SkillDetail.controls['SKILLS_ID'].setValue(skill.SKILLS_ID);
    this.SkillDetail.controls['ID'].setValue(skill.ID);
    this.SkillDetail.controls['DAS'].setValue(skill.DAS);
    this.SkillDetail.controls['ACADEMY'].setValue(skill.ACADEMY);
    this.SkillDetail.controls['K8S'].setValue(skill.K8S);
    this.SkillDetail.controls['NETWORKING'].setValue(skill.NETWORKING);
    this.SkillDetail.controls['JIRA'].setValue(skill.JIRA);
    

  }

  updateSkill() {
    const skill = {
      SKILLS_ID: this.SkillDetail.value.SKILLS_ID,
      ID: this.SkillDetail.value.ID,
      DAS : this.SkillDetail.value.DAS,
      ACADEMY : this.SkillDetail.value.ACADEMY,
      K8S : this.SkillDetail.value.K8S,
      NETWORKING : this.SkillDetail.value.NETWORKING,
      JIRA : this.SkillDetail.value.JIRA

    };
    

    this.skillService.updateSkill(skill).subscribe(()=>{
      this.getAllSkills();
    })

  }

  

}
