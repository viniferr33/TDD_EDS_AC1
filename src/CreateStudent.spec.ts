interface Student {
  name: string;
  email: string;
  phone: string;
  password: string;
}

class CreateStudent {
  constructor(private readonly studentRepository: StudentRepository) {}

  private testEmail(email: string): boolean {
    const emailRegExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegExp.test(email);
  }

  private testPassword(password: string): boolean {
    const passwordRegExp: RegExp = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,})/;
    return passwordRegExp.test(password);
  }

  async execute(props: Student): Promise<void> {
    const { email, password } = props;

    if (!this.testEmail(email)) return;

    if (!this.testPassword(password)) return;

    const studentExists = await this.studentRepository.getStudentByEmail(email);
    if (studentExists) return;

    await this.studentRepository.addStudent(props);
  }
}

class StudentRepository {
  studentList: Student[];

  constructor() {
    this.studentList = [
      {
        name: "Um usuario que ja existe",
        email: "um_usuario_existente@teste.com",
        phone: "4002-8922",
        password: "Outra senha",
      },
    ];
  }

  async getStudentByEmail(email: string): Promise<Student | undefined> {
    const myStudent = this.studentList.find(
      (student) => student.email === email
    );

    return myStudent;
  }

  async addStudent(student: Student): Promise<void> {
    this.studentList.push(student);
  }
}

describe("Cadastro de Aluno", () => {
  it("Teste 1: Cadastro feito com sucesso", async () => {
    const studentRepository = new StudentRepository();
    const createStudent = new CreateStudent(studentRepository);

    const input = {
      name: "Um nome qualquer",
      email: "email_de_teste@teste.com",
      phone: "4002-8922",
      password: "umasenhaforte@123AAA",
    };

    await createStudent.execute(input);

    expect(studentRepository.studentList).toContain(input);
  });

  it("Teste 2: O cadastro não foi feito - Os campos não fora preenchidos corretamente", async () => {
    const studentRepository = new StudentRepository();
    const createStudent = new CreateStudent(studentRepository);

    const input = {
      name: "Um nome qualquer",
      email: "um_não_email",
      phone: "4002-8922",
      password: "umasenhafraca",
    };

    await createStudent.execute(input);

    expect(studentRepository.studentList).not.toContain(input);
  });

  it("Teste 3: O cadastro não foi feito - Email de Usuario ja existe", async () => {
    const studentRepository = new StudentRepository();
    const createStudent = new CreateStudent(studentRepository);

    const input = {
      name: "Um usuario que ja existe",
      email: "um_usuario_existente@teste.com",
      phone: "4002-8922",
      password: "Outra senha",
    };

    await createStudent.execute(input);

    expect(studentRepository.studentList).not.toContain(input);
  });
});
