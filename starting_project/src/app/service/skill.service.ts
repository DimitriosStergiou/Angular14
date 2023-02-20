import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {


   private readonly skillsURL= 'skills';
   private readonly getSkillURL= 'skill';

  constructor(private http: HttpClient) {}



  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillsURL);
  }

  updateSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(this.skillsURL+'/'+skill.ID, skill);
  }

  getSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.getSkillURL);
  }
  




}