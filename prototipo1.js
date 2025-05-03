const fs = require('fs');
let alunos = require('./alunos.json');

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\neae, bem vindo ao fodasefodase app tudo pronto para se tornar um membro da guilda?\n')

rl.question('eu falo com um professor ou um aprendiz?\n', resposta => {

    switch (resposta.toLowerCase()) {
        case 'professor':
            Profesor()
            break;

        case 'aluno':
            aluno()
            break;

        default:
            console.log('\nfoi mal mas nos nao reconhecemos essa frase ou palavra no sistema\nreinicie o app e escolha, professor ou aprendiz')
            break;


    }

})

function Profesor() {

    rl.question('\nqual seu nome?\n', respostaProf => {
        var nomeProf = respostaProf

        rl.question('\nqual sera seu titulo de alto cargo? (ex: o terrivel Renato, a fada Adriele, o fauno Jasiel)\n', tituloProf => {

            var nomeProf = `${tituloProf} ${respostaProf}`

            hubProf()

            function hubProf() {

                rl.question(`\n Bem-vindo(a) ao hall de entrada ${nomeProf} \n aqui voce conseguira fazer atividades professorescas se podemos assim dizer\n\nmecher na sala de aula \n(digite: sala)\n\naumentar pontos de seus discipulos\n(digite: pontos)\n\n Ir Embora\n(faça o comando: ctrl+c)\n\n`, Hall => {

                    switch (Hall.toLowerCase()) {
                        case 'sala':
                            console.log('\n\nbem vindo(a) sala\n');

                            acoesSala()
                            function acoesSala() {
                                rl.question('\noque gostaria de fazer?\n\n ver alunos atuais (1)\n retirar aluno (2)\n adicionar um aluno (3)\n Voltar Ao Hall(4)\n\n', acSala => {

                                    switch (acSala) {
                                        case '1':
                                            console.log(`\naqui esta a lista de todos os alunos\n`)

                                            alunos.forEach(p => {
                                                console.log(`${p.nome} `)
                                            })
                                            acoesSala()
                                            break;

                                        case '2':
                                            rl.question('\nqual aluno gostaria de banir para o sub-mundo >:) ?\n', expulso => {


                                                alunos = alunos.filter(p => p.nome !== expulso)
                                                fs.writeFileSync('alunos.json', JSON.stringify(alunos))
                                                console.log(`\ndesejo consebido com sucesso o aluno(a)${expulso}\n`)

                                                console.log(`\naqui esta a lista de todos os alunos a partir de agora!\n`)

                                                alunos.forEach(p => {
                                                    console.log(`${p.nome} `)
                                                })
                                                acoesSala()
                                            })
                                            break;

                                        case '3':
                                            rl.question('\nqual o nome do discipulo que gostaria de convocar para sala?\n', alunoNovo => {
                                                rl.question('\nqual a nota atual do mesmo?\n', nota => {

                                                    alunos.push({ "nome": alunoNovo, "nota": nota });
                                                    fs.writeFileSync('alunos.json', JSON.stringify(alunos))

                                                    console.log(`\naqui esta a lista de todos os alunos a partir de agora!\n`)

                                                    alunos.forEach(p => {
                                                        console.log(`${p.nome} `)
                                                    })
                                                    acoesSala()
                                                })
                                            })
                                            break;

                                        case '4':
                                            hubProf()
                                            break;

                                        default:
                                            console.log('que pena q vc foi embora logo quando começamos a nos divertir :<')
                                            break;

                                    }
                                })


                            }

                            break

                        case 'pontos':

                            salaPontos()
                            function salaPontos() {
                                console.log('\nBem-vindo a sala de pontos, onde as coisas ficam quentes');

                                rl.question('\noque gostaria de fazer?\n\n ver as notas atuais dos alunos (1)\n retirar nota de um aluno (2)\n adicionar notas para um aluno (3)\n Voltar Ao Hall(4)\n\n', acPontos => {

                                    switch (acPontos) {
                                        case '1':
                                            console.log(`\naqui esta a lista de todos os alunos com as notas\n`)

                                            alunos.forEach(p => {
                                                console.log(`${p.nome} ${p.nota} `)
                                            })
                                            salaPontos()
                                            break;

                                        case '2':
                                            alunos.forEach(p => {
                                                console.log(`${p.nome}, ${p.nota} `)
                                            })

                                            rl.question('\naqui esta a lista de todos os alunos !\n\n escolha primeiro quem vai perder nota basta digitar sua posiçao na lista\n (lembre-se: a ordem começa no 0, ou seja 0,1,2,3,4... )\n ', menosNaluno => {



                                                rl.question(`\nqual a quantidade de nota que vai retirar >:) ?\n `, retiroNota => {

                                                    alunos[menosNaluno].nota -= retiroNota;


                                                    alunos = alunos.filter(p => p.nome !== menosNaluno)
                                                    fs.writeFileSync('./alunos.json', JSON.stringify(alunos, null, 2))
                                                    console.log(`\n desejo consebido com sucesso o aluno(a) ${alunos[menosNaluno].nome} perdeu ${retiroNota} pontos.\n`)

                                                    salaPontos()

                                                })
                                            })
                                            break;

                                        case '3':

                                        alunos.forEach(p => {
                                            console.log(`${p.nome}, ${p.nota} `)
                                        })

                                            rl.question('\naqui esta a lista de todos os alunos !\n escolha primeiro quem vai ganhar nota basta digitar sua posiçao na lista\n (lembre-se: a ordem começa no 0, ou seja 0,1,2,3,4... ) ', maisNaluno => {



                                                rl.question(`\nqual a quantidade de nota que vai adicionar ?\n `, adicionoNota => {

                                                    const notaAtual = Number(alunos[maisNaluno].nota);
                                                    const adicional = Number(adicionoNota);

                                                    alunos[maisNaluno].nota = notaAtual + adicional;
                                                    
                                                    fs.writeFileSync('./alunos.json', JSON.stringify(alunos, null, 2));
                                                    
                                                    console.log(`\nDesejo concedido com sucesso! O aluno(a) ${alunos[maisNaluno].nome} ganhou ${adicional} pontos.\nNota atual: ${alunos[maisNaluno].nota}\n`);

                                                    salaPontos()

                                                })
                                            })
                                            break;

                                        case '4':
                                            hubProf()
                                            break;

                                        default:
                                            console.log('que pena q vc foi embora logo quando começamos a nos divertir :<')
                                            break;

                                    }

                                })
                            }
                            break;
                        default:
                            hubProf();
                            break

                    }
                })

            }



        })


    })

}




function aluno() {
    console.log('n fiz fodase smt')
}

