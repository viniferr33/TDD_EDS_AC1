interface Student {
  name: string;
  email: string;
  phone: string;
  password: string;
}

class CreateStudent {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(props: Student): Promise<void> {
    const emailRegExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const emailResult: boolean = emailRegExp.test(props.email);

    if (!emailResult) return;

    const passwordRegExp: RegExp = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,})/;
    const passwordResult: boolean = passwordRegExp.test(props.password);

    if (!passwordResult) return;

    const allEmails = this.studentRepository.studentList.map((e) => e.email);
    if (allEmails.includes(props.email)) return;

    this.studentRepository.studentList.push(props);
  }
}

class StudentRepository {
  studentList: Student[];

  constructor() {
    this.studentList = [];
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
