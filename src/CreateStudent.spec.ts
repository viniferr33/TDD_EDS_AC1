interface Student {
  name: string;
  email: string;
  phone: string;
  password: string;
}

class CreateStudent {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(props: Student): Promise<void> {}
}

class StudentRepository {
  studentList?: Student[];
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

  it("Teste 3: O cadastro não foi feito - Usuario ja existe", async () => {
    const studentRepository = new StudentRepository();
    const createStudent = new CreateStudent(studentRepository);

    const input = {
      name: "Um usuario que ja existe",
      email: "um_usuario_existente@teste.com",
      phone: "4002-8922",
      password: "umasenhaforte@123AAA",
    };

    await createStudent.execute(input);

    expect(studentRepository.studentList).not.toContain(input);
  });
});
