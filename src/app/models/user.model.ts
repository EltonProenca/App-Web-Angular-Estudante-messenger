export interface Roles {
  user?: boolean;
  admin?: boolean;
}
export class User {

  public $key: string;
  public roles: Roles;

  constructor(
      public key: string,
      public name: string,
      public ra: string,
      public usuario: string,
      public email: string,
      public photo: string,
      public curso: string,
      public Curso0: string,
      public Curso1: string,
      public Curso2: string,
      public Curso3: string,
      public Curso4: string,
      public Curso5: string,
      public Curso6: string,
      public Curso7: string,
      public Periodo0: string,
      public Periodo1: string,
      public Periodo2: string,
      public Periodo3: string,
      public Periodo4: string,
      public Periodo5: string,
      public Periodo6: string,
      public Periodo7: string,
      public Materia0: string,
      public Materia1: string,
      public Materia2: string,
      public Materia3: string,
      public Materia4: string,
      public Materia5: string,
      public Materia6: string,
      public Materia7: string,
      public pathMateria0: string,
      public pathMateria1: string,
      public pathMateria2: string,
      public pathMateria3: string,
      public pathMateria4: string,
      public pathMateria5: string,
      public pathMateria6: string,
      public pathMateria7: string,
      public pathProfMateria0: string,
      public pathProfMateria1: string,
      public pathProfMateria2: string,
      public pathProfMateria3: string,
      public pathProfMateria4: string,
      public pathProfMateria5: string,
      public pathProfMateria6: string,
      public pathProfMateria7: string,
      public password: string

  ) {

    this.roles = {user: true }
  }

}
