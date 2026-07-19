/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Exercise } from './types';

export const EXERCISES_SERIE_A: Exercise[] = [
  {
    id: 'a1',
    name: 'Cadeira Extensora',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Quadríceps',
    targetMuscles: ['Reto Femoral', 'Vasto Lateral', 'Vasto Medial'],
    equipment: 'Aparelho Extensor de Pernas (Polia)',
    images: ['images/Cadeira Extensora.png'],
    instructions: [
      'Ajuste o encosto de modo que a dobra dos joelhos coincida com a borda do assento.',
      'Coloque o rolo almofadado logo acima do tornozelo.',
      'Segure firme nos apoios laterais para estabilizar o quadril.',
      'Estenda os joelhos completamente, contraindo os quadríceps no topo.',
      'Retorne de forma controlada até o ângulo inicial sem bater os pesos.'
    ],
    tips: 'Mantenha o quadril pressionado contra o banco durante todo o movimento para não compensar com a lombar.',
    svgType: 'leg_extension'
  },
  {
    id: 'a2',
    name: 'Leg Press 45°',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Quadríceps & Glúteos',
    targetMuscles: ['Quadríceps', 'Glúteo Máximo', 'Isquiotibiais'],
    equipment: 'Leg Press Angulado 45 Graus',
    images: ['images/Leg Press.png'],
    instructions: [
      'Sente-se com as costas e cabeça apoiadas firmemente no encosto.',
      'Posicione os pés na largura dos ombros no meio da plataforma.',
      'Destrave a trava de segurança com cuidado.',
      'Flexione os joelhos trazendo a plataforma em direção ao peito até formar um ângulo de 90°.',
      'Empurre a plataforma estendendo as pernas sem travar totalmente os joelhos no final.'
    ],
    tips: 'Nunca deixe seus joelhos desabarem para dentro (valgo dinâmico) nem tire o quadril do encosto.',
    svgType: 'leg_press_45'
  },
  {
    id: 'a3',
    name: 'Leg Horizontal',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Quadríceps & Glúteos',
    targetMuscles: ['Quadríceps', 'Glúteo Máximo', 'Panturrilhas'],
    equipment: 'Leg Press Horizontal (Cabos)',
    images: ['images/Leg Press.png'],
    instructions: [
      'Ajuste a distância do assento para que comece com os joelhos em torno de 90°.',
      'Apoie os pés na plataforma na largura do quadril.',
      'Empurre o corpo/plataforma estendendo os joelhos de forma contínua.',
      'Mantenha as mãos nos apoios e o tronco totalmente apoiado.',
      'Retorne devagar sentindo o alongamento da musculatura.'
    ],
    tips: 'Ideal para estabilizar a coluna lombar. Concentre a força nos calcanhares.',
    svgType: 'leg_horizontal'
  },
  {
    id: 'a4',
    name: 'Cadeira Adutora',
    defaultSets: 3,
    defaultReps: '12',
    muscleGroup: 'Adutores',
    targetMuscles: ['Adutor Magno', 'Adutor Longo', 'Grácil'],
    equipment: 'Cadeira Adutora (Polia)',
    images: ['images/Cadeira Adutora.png'],
    instructions: [
      'Sente-se com a coluna reta e bem encostada.',
      'Ajuste o ângulo de abertura inicial de forma confortável, porém desafiadora.',
      'Apoie a parte interna das pernas nas almofadas.',
      'Feche as pernas unindo os joelhos ao centro de forma controlada.',
      'Abra devagar controlando a carga até o ponto inicial.'
    ],
    tips: 'Segure 1 segundo na contração máxima (pernas fechadas) para recrutar mais fibras.',
    svgType: 'adductor'
  },
  {
    id: 'a5',
    name: 'Agachamento Livre / Peso Corporal',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Coxas & Glúteos',
    targetMuscles: ['Quadríceps', 'Isquiotibiais', 'Glúteo Máximo', 'Core'],
    equipment: 'Peso Corporal ou Barra Livre',
    images: ['images/Agachamento Barra Máquina.png'],
    instructions: [
      'Fique em pé com os pés ligeiramente mais largos que os ombros, virados para fora (15°).',
      'Inicie o movimento projetando o quadril para trás, como se fosse sentar em uma cadeira.',
      'Mantenha o peito aberto e olhe para frente, joelhos apontando no mesmo rumo dos pés.',
      'Desça até que as coxas fiquem pelo menos paralelas ao chão.',
      'Suba empurrando o chão e contraindo glúteos e pernas.'
    ],
    tips: 'Aperte o abdômen e mantenha os calcanhares grudados no chão durante todo o movimento.',
    svgType: 'squat_free'
  },
  {
    id: 'a6',
    name: 'Stiff com Halter',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Posterior & Lombar',
    targetMuscles: ['Isquiotibiais (Posteriores)', 'Glúteo Máximo', 'Eretores da Espinha'],
    equipment: 'Par de Halteres',
    images: ['images/Agachamento Sumô.png'],
    instructions: [
      'Segure um halter em cada mão à frente das coxas com as palmas voltadas para trás.',
      'Mantenha os pés na largura do quadril e joelhos levemente destravados (semi-flexionados).',
      'Inicie empurrando o quadril para trás bem longe, mantendo a coluna completamente neutra (reta).',
      'Desça os halteres rente às pernas até o limite do alongamento dos seus posteriores.',
      'Retorne contraindo os glúteos e erguendo o tronco de volta.'
    ],
    tips: 'Não flexione ou arredonde os ombros e a lombar. O movimento é exclusivamente de dobradiça de quadril.',
    svgType: 'stiff_dumbbell'
  },
  {
    id: 'a7',
    name: 'Puxada Aberta Máquina c/ Anilha',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Dorsais',
    targetMuscles: ['Latíssimo do Dorso', 'Redondo Maior', 'Bíceps Braquial'],
    equipment: 'Máquina de Puxada Convergente / Barra Pulley',
    images: ['images/Puxada Máquina.png'],
    instructions: [
      'Ajuste o apoio de coxas para firmar o quadril.',
      'Segure a barra com uma pegada bem aberta, palmas voltadas para frente.',
      'Inicie o movimento puxando os cotovelos para baixo e para trás.',
      'Leve a barra ou apoios até a altura do queixo, estufando o peito no final.',
      'Retorne devagar estendendo totalmente os braços, alongando as costas.'
    ],
    tips: 'Foque em puxar com os cotovelos e não com as mãos para isolar melhor as dorsais.',
    svgType: 'lat_pulldown'
  },
  {
    id: 'a8',
    name: 'Remada Apoiada PN',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Costas & Bíceps',
    targetMuscles: ['Mid-Trapezio', 'Rombóides', 'Latíssimo do Dorso', 'Bíceps'],
    equipment: 'Aparelho de Remada com Apoio de Peito (Mecânica)',
    images: ['images/Remada na Máquina.png'],
    instructions: [
      'Ajuste a altura do banco para que as mãos fiquem na linha do peito.',
      'Apoie o esterno firmemente na almofada frontal.',
      'Segure as manoplas na pegada neutra (palmas voltadas uma para a outra).',
      'Puxe as manoplas retraindo as escápulas ("fechando as costas") e direcionando cotovelos para trás.',
      'Retorne alongando a musculatura, resistindo ao peso.'
    ],
    tips: 'Mantenha o peito sempre colado no apoio. Não jogue o pescoço para a frente.',
    svgType: 'chest_supported_row'
  },
  {
    id: 'a9',
    name: 'Bíceps c/ Barra Reta Livre',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Bíceps',
    targetMuscles: ['Bíceps Braquial', 'Braquial', 'Braquiorradial'],
    equipment: 'Barra Reta Livre (Discos/Anilhas)',
    images: ['images/Bíceps com Barra Reta Livre.png'],
    instructions: [
      'Fique em pé com as pernas na largura do quadril, joelhos relaxados.',
      'Segure a barra reta com as palmas voltadas para cima (pegada supinada), largura dos ombros.',
      'Mantenha os cotovelos colados nas laterais do tronco.',
      'Flexione os braços subindo a barra em direção aos ombros.',
      'Desça controladamente até o braço quase estender por completo.'
    ],
    tips: 'Não balance o tronco para pegar impulso (roubo). Mantenha o corpo perfeitamente ereto.',
    svgType: 'bicep_curl_bar'
  },
  {
    id: 'a10',
    name: 'Pulldown Bíceps no Pulley',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Bíceps',
    targetMuscles: ['Bíceps Braquial', 'Braquiorradial'],
    equipment: 'Estação de Polia (Cabo Inferior com Barra Reta/W)',
    images: ['images/Pulldown Biceps.png'],
    instructions: [
      'Prenda a barra curta no cabo na polia baixa.',
      'Segure a barra e dê um pequeno passo para trás para tensionar o cabo.',
      'Cotovelos estabilizados nas costelas.',
      'Puxe a barra em direção ao peito, apertando o bíceps na parte superior.',
      'Retorne de forma lenta lutando contra a tração do cabo.'
    ],
    tips: 'Cabos mantêm tensão em todo o percurso, tire proveito disso descendo o peso bem devagar.',
    svgType: 'bicep_pulley'
  },
  {
    id: 'a11',
    name: 'Esteira Cardio',
    defaultSets: 1,
    defaultReps: '20-30m',
    muscleGroup: 'Cardiovascular',
    targetMuscles: ['Sistema Cardiovascular', 'Quadríceps', 'Panturrilhas'],
    equipment: 'Esteira Ergométrica',
    images: ['images/Esteira Caminhada.png'],
    instructions: [
      'Inicie com um aquecimento lento por 3 a 5 minutos.',
      'Aumente a velocidade ou inclinação para um nível moderado (zona de queima de gordura/aeróbica).',
      'Mantenha a postura ereta e os braços relaxados e sincronizados.',
      'Respire de forma profunda e compassada.',
      'Reduza gradualmente a velocidade nos últimos 3 minutos para resfriamento.'
    ],
    tips: 'Se preferir queimar mais calorias sem impacto, use inclinação moderada (3-6%) e caminhe rápido.',
    svgType: 'treadmill'
  }
];

export const EXERCISES_SERIE_B: Exercise[] = [
  {
    id: 'b1',
    name: 'Cadeira Flexora',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Posterior',
    targetMuscles: ['Bíceps Femoral', 'Semitendíneo', 'Semimembranáceo'],
    equipment: 'Mesa/Cadeira Flexora Acoplada (Polia)',
    images: ['images/Cadeira Extensora.png'],
    instructions: [
      'Sente-se posicionando a parte de trás do joelho colada na dobra do banco.',
      'Ajuste o apoio almofadado acima do tendão de Aquiles.',
      'Abaixe o fixador de coxa com firmeza para prender suas pernas.',
      'Flexione os joelhos para baixo e para trás, trazendo os calcanhares abaixo da cadeira.',
      'Retorne estendendo lentamente as pernas de volta.'
    ],
    tips: 'Mantenha os pies fletidos (dedos apontados para o teto) para recrutar mais intensamente os posteriores.',
    svgType: 'leg_curl'
  },
  {
    id: 'b2',
    name: 'Cadeira Abdutora',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Glúteos / Quadris',
    targetMuscles: ['Glúteo Médio', 'Glúteo Mínimo', 'Tensor da Fáscia Lata'],
    equipment: 'Cadeira Abdutora (Polia)',
    images: ['images/Cadeira Abdutora.png'],
    instructions: [
      'Sente-se mantendo o tronco erguido ou ligeiramente inclinado à frente para isolar os glúteos.',
      'Posicione as almofadas na parte lateral externa dos joelhos.',
      'Faça força para afastar as coxas, empurrando as almofadas para fora.',
      'Segure 1-2 segundos na abertura máxima.',
      'Retorne devagar aproximando os apoios sem deixar a pilha de peso se chocar.'
    ],
    tips: 'Inclinar o quadril levemente para frente transfere o foco de forma espetacular para a musculatura superior do glúteo.',
    svgType: 'abductor'
  },
  {
    id: 'b3',
    name: 'Agachamento Sumô',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Coxas & Glúteos',
    targetMuscles: ['Adutores (Interno de Coxa)', 'Glúteo Máximo', 'Quadríceps'],
    equipment: 'Halter Pesado ou Kettlebell',
    images: ['images/Agachamento Sumô.png'],
    instructions: [
      'Fique de pé com um afastamento bem largo das pernas (posição de sumô).',
      'Aponte as pontas dos pés para fora em um ângulo confortável (~45°).',
      'Segure the halter de pé por uma das extremidades, estendendo os braços para baixo.',
      'Agache projetando o quadril para baixo e direcionando joelhos estritamente para fora.',
      'Suba empurrando pelos calcanhares e espremendo os glúteos no topo.'
    ],
    tips: 'Não permita que os joelhos se curvesm para dentro. Eles devem seguir rigorosamente a linha externa do pé.',
    svgType: 'sumo_squat'
  },
  {
    id: 'b4',
    name: 'Panturrilha em Pé',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Panturrilhas',
    targetMuscles: ['Gastrocnêmio Lateral', 'Gastrocnêmio Medial', 'Sóleu'],
    equipment: 'Degrau, Gaiola de Panturrilha ou Máquina em Pé',
    images: ['images/Panturrilha em Pé.png'],
    instructions: [
      'Apoie apenas a ponta dos pés na borda de um degrau ou plataforma.',
      'Se posicione ereto. Use o corrimão para equilíbrio se for livre.',
      'Desça os calcanhares o máximo possível, ganhando o alongamento total da panturrilha.',
      'Suba empurrando com a articulação dos dedões, elevando o corpo ao ápice.',
      'Controle rigorosamente a descida.'
    ],
    tips: 'Pare 1 segundo embaixo para eliminar a energia elástica do tendão e exigir força pura da panturrilha.',
    svgType: 'calf_raise'
  },
  {
    id: 'b5',
    name: 'Peitoral Sentado Máquina / Fly',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Peitoral',
    targetMuscles: ['Pectoralis Major', 'Deltoide Anterior'],
    equipment: 'Máquina Pec Fly / Voador Peitoral',
    images: ['images/Peck Deck Voador Fly.png'],
    instructions: [
      'Ajuste o banco para que as manoplas fiquem alinhadas com a altura dos ombros.',
      'Encoste totalmente as costas e mantenha o abdômen contraído.',
      'Pegue nos apoios com cotovelos ligeiramente flexionados e travados nessa posição.',
      'Aproxime os braços à frente do rosto, espremendo o peito no encontro.',
      'Abra de volta controlando a carga até sentir alongar a musculatura peitoral.'
    ],
    tips: 'Não jogue os ombros para frente quando unir as mãos. Mantenha as escápulas aduzidas contra o banco.',
    svgType: 'pec_fly'
  },
  {
    id: 'b6',
    name: 'Supino Reto Máquina',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Peitoral & Tríceps',
    targetMuscles: ['Pectoralis Major', 'Tríceps Braquial', 'Deltoide Anterior'],
    equipment: 'Máquina de Supino Horizontal Articulada',
    images: ['images/Supino Reto Máquina.png'],
    instructions: [
      'Sente-se com as costas bem firmadas e os pés apojados no chão.',
      'Ajuste o assento para que as manoplas coincidam com a linha média do peito.',
      'Empurre as manoplas para a frente de maneira explosiva e controlada, estendendo os braços.',
      'Retorne trazendo o peso até rente ao peito de modo lento.',
      'Mantenha os ombros relaxados e fixos para trás.'
    ],
    tips: 'Sinta a musculatura do peito agir tanto ao empurrar quanto ao segurar o retorno da manopla.',
    svgType: 'chest_press_machine'
  },
  {
    id: 'b7',
    name: 'Hammer Inclinado / Desenvolvimento Inclinado Máquina',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Peitoral Superior & Ombros',
    targetMuscles: ['Porção Clavicular do Peitoral', 'Deltoide Anterior', 'Tríceps'],
    equipment: 'Máquina de Supino Convergente Inclinado (Hammer)',
    images: ['images/Hammer Inclinado.png'],
    instructions: [
      'Ajuste o banco de forma que as pegadas estejam no nível superior do peitoral.',
      'Mantenha as escápulas juntas e empurre as manoplas para cima e para frente acompanhando o arco.',
      'Mantenha o cotovelo sempre posicionado abaixo do nível do punho durante toda a subida.',
      'Retorne de forma contínua até sentir o alongamento do peito superior.'
    ],
    tips: 'A inclinação foca no início do peito e deltóides, ideal para modelar e empunhar força nos ombros.',
    svgType: 'incline_hammer_press'
  },
  {
    id: 'b8',
    name: 'Elevação Lateral / Abdução de Ombros com Halter',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Ombros',
    targetMuscles: ['Deltoide Lateral', 'Deltoide Anterior'],
    equipment: 'Par de Halteres Médios',
    images: ['images/Elevação Lateral com Halteres.png'],
    instructions: [
      'Fique em pé com a espinha reta e halteres ao lado do quadril.',
      'Mantenha joelhos levemente destravados e incline o tronco 5° para a frente.',
      'Eleve os braços lateralmente em arco até a altura dos ombros.',
      'Os cotovelos devem liderar a subida e ficar sutilmente flexionados.',
      'Desça os halteres lentamente controlando a gravidade.'
    ],
    tips: 'Pense em "jogar os halteres para longe, em direção às paredes", e não simplesmente para cima.',
    svgType: 'lateral_raise'
  },
  {
    id: 'b9',
    name: 'Tríceps Pronado Cross / Pulley',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Tríceps',
    targetMuscles: ['Tríceps Braquial (Cabeça Lateral)', 'Tríceps (Cabeça Medial)'],
    equipment: 'Estação Pulley (Cabo Superior com Barra Reta/V)',
    images: ['images/Pulldown Biceps.png'],
    instructions: [
      'Ajuste a polia alta e segure a barra reta com pegada pronada (palmas para baixo).',
      'Aproxime os cotovelos das costelas e trave-os ali firmemente.',
      'Empurre a barra para baixo estendendo os braços por completo, contraindo o tríceps.',
      'Retorne permitindo que os antebraços subam até em torno de 90° sem mover os cotovelos.',
      'Mantenha o abdômen ativado.'
    ],
    tips: 'Não use o peso corporal inclinando-se excessivamente por cima da polia para empurrar. Use apenas os cotovelos como ponto de pivô.',
    svgType: 'tricep_pushdown'
  },
  {
    id: 'b10',
    name: 'Pullover no Pulley',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Dorsais & Peito',
    targetMuscles: ['Latíssimo do Dorso', 'Redondo Maior', 'Pectoralis Minor', 'Tríceps'],
    equipment: 'Estação Pulley com Barra Reta ou Corda Longa, Polia Alta',
    images: ['images/Puxada Máquina.png'],
    instructions: [
      'Segure a barra com pegada pronada com as mãos na largura dos ombros.',
      'Dê dois passos para trás e incline levemente o quadril para trás, mantendo joelhos semi-flexionados.',
      'Mantenha os braços quase totalmente estendidos (cotovelos sutilmente confortáveis).',
      'Puxe a barra em direção às coxas em um arco circular descendente amplo.',
      'Esprema a lateral das costas no final do arco e retorne devagar alongando o peito e lats.'
    ],
    tips: 'Mantenha os ombros longe das orelhas (deprimidos) e ative as dorsais ao longo de todo o arco.',
    svgType: 'cable_pullover'
  },
  {
    id: 'b11',
    name: 'Bicicleta Cardio',
    defaultSets: 1,
    defaultReps: '20-30m',
    muscleGroup: 'Cardiovascular',
    targetMuscles: ['Sistema Cardiovascular', 'Quadríceps', 'Panturrilhas'],
    equipment: 'Bicicleta Ergométrica',
    images: ['images/Bicicleta.png'],
    instructions: [
      'Ajuste a altura do selim para que sua perna fique quase totalmente estendida no ponto mais baixo.',
      'Inicie pedalando com carga leve por 3 a 5 minutos para aquecer.',
      'Aumente a resistência para manter um ritmo moderado e constante.',
      'Mantenha o tronco alinhado e evite balançar o quadril nas laterais.',
      'Reduza a resistência nos últimos 3 minutos para desacelerar o ritmo cardíaco.'
    ],
    tips: 'Excelente opção de cardio de baixo impacto para preservar as articulações dos joelhos.',
    svgType: 'treadmill'
  }
];

export const EXERCISES_SERIE_C: Exercise[] = [
  {
    id: 'b5',
    name: 'Peitoral Sentado Máquina / Fly',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Peitoral',
    targetMuscles: ['Pectoralis Major', 'Deltoide Anterior'],
    equipment: 'Máquina Pec Fly / Voador Peitoral',
    images: ['images/Peck Deck Voador Fly.png'],
    instructions: [
      'Ajuste o banco para que as manoplas fiquem alinhadas com a altura dos ombros.',
      'Encoste totalmente as costas e mantenha o abdômen contraído.',
      'Pegue nos apoios com cotovelos ligeiramente flexionados e travados nessa posição.',
      'Aproxime os braços à frente do rosto, espremendo o peito no encontro.',
      'Abra de volta controlando a carga até sentir alongar a musculatura peitoral.'
    ],
    tips: 'Não jogue os ombros para frente quando unir as mãos. Mantenha as escápulas aduzidas contra o banco.',
    svgType: 'pec_fly'
  },
  {
    id: 'c2',
    name: 'Pec Deck',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Peitoral',
    targetMuscles: ['Pectoralis Major', 'Deltoide Anterior'],
    equipment: 'Máquina Pec Deck',
    images: ['images/Peck Deck Invertido.png'],
    instructions: [
      'Ajuste o assento para que as manoplas fiquem na altura do peito.',
      'Sente-se com as costas apoiadas firmemente no encosto.',
      'Segure as manoplas com as palmas voltadas para a frente e cotovelos levemente flexionados.',
      'Aproxime os braços à frente do corpo em um movimento controlado, contraindo o peitoral.',
      'Retorne devagar até sentir o alongamento do peito, mantendo o controle da carga.'
    ],
    tips: 'Mantenha os ombros relaxados e as escápulas presas contra o encosto durante toda a execução.',
    svgType: 'pec_fly'
  },
  {
    id: 'b7',
    name: 'Hammer Inclinado / Desenvolvimento Inclinado Máquina',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Peitoral Superior & Ombros',
    targetMuscles: ['Porção Clavicular do Peitoral', 'Deltoide Anterior', 'Tríceps'],
    equipment: 'Máquina de Supino Convergente Inclinado (Hammer)',
    images: ['images/Hammer Inclinado.png'],
    instructions: [
      'Ajuste o banco de forma que as pegadas estejam no nível superior do peitoral.',
      'Mantenha as escápulas juntas e empurre as manoplas para cima e para frente acompanhando o arco.',
      'Mantenha o cotovelo sempre posicionado abaixo do nível do punho durante toda a subida.',
      'Retorne de forma contínua até sentir o alongamento do peito superior.'
    ],
    tips: 'A inclinação foca no início do peito e deltóides, ideal para modelar e empunhar força nos ombros.',
    svgType: 'incline_hammer_press'
  },
  {
    id: 'a8',
    name: 'Remada Apoiada PN',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Costas & Bíceps',
    targetMuscles: ['Mid-Trapezio', 'Rombóides', 'Latíssimo do Dorso', 'Bíceps'],
    equipment: 'Aparelho de Remada com Apoio de Peito (Mecânica)',
    images: ['images/Remada na Máquina.png'],
    instructions: [
      'Ajuste a altura do banco para que as mãos fiquem na linha do peito.',
      'Apoie o esterno firmemente na almofada frontal.',
      'Segure as manoplas na pegada neutra (palmas voltadas uma para a outra).',
      'Puxe as manoplas retraindo as escápulas ("fechando as costas") e direcionando cotovelos para trás.',
      'Retorne alongando a musculatura, resistindo ao peso.'
    ],
    tips: 'Mantenha o peito sempre colado no apoio. Não jogue o pescoço para a frente.',
    svgType: 'chest_supported_row'
  },
  {
    id: 'a7',
    name: 'Puxada Aberta Máquina c/ Anilha',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Dorsais',
    targetMuscles: ['Latíssimo do Dorso', 'Redondo Maior', 'Bíceps Braquial'],
    equipment: 'Máquina de Puxada Convergente / Barra Pulley',
    images: ['images/Puxada Máquina.png'],
    instructions: [
      'Ajuste o apoio de coxas para firmar o quadril.',
      'Segure a barra com uma pegada bem aberta, palmas voltadas para frente.',
      'Inicie o movimento puxando os cotovelos para baixo e para trás.',
      'Leve a barra ou apoios até a altura do queixo, estufando o peito no final.',
      'Retorne devagar estendendo totalmente os braços, alongando as costas.'
    ],
    tips: 'Foque em puxar com os cotovelos e não com as mãos para isolar melhor as dorsais.',
    svgType: 'lat_pulldown'
  },
  {
    id: 'a10',
    name: 'Pulldown Bíceps no Pulley',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Bíceps',
    targetMuscles: ['Bíceps Braquial', 'Braquiorradial'],
    equipment: 'Estação de Polia (Cabo Inferior com Barra Reta/W)',
    images: ['images/Pulldown Biceps.png'],
    instructions: [
      'Prenda a barra curta no cabo na polia baixa.',
      'Segure a barra e dê um pequeno passo para trás para tensionar o cabo.',
      'Cotovelos estabilizados nas costelas.',
      'Puxe a barra em direção ao peito, apertando o bíceps na parte superior.',
      'Retorne de forma lenta lutando contra a tração do cabo.'
    ],
    tips: 'Cabos mantêm tensão em todo o percurso, tire proveito disso descendo o peso bem devagar.',
    svgType: 'bicep_pulley'
  },
  {
    id: 'a9',
    name: 'Bíceps c/ Barra Reta Livre',
    defaultSets: 3,
    defaultReps: '10-12',
    muscleGroup: 'Bíceps',
    targetMuscles: ['Bíceps Braquial', 'Braquial', 'Braquiorradial'],
    equipment: 'Barra Reta Livre (Discos/Anilhas)',
    images: ['images/Bíceps com Barra Reta Livre.png'],
    instructions: [
      'Fique em pé com as pernas na largura do quadril, joelhos relaxados.',
      'Segure a barra reta com as palmas voltadas para cima (pegada supinada), largura dos ombros.',
      'Mantenha os cotovelos colados nas laterais do tronco.',
      'Flexione os braços subindo a barra em direção aos ombros.',
      'Desça controladamente até o braço quase estender por completo.'
    ],
    tips: 'Não balance o tronco para pegar impulso (roubo). Mantenha o corpo perfeitamente ereto.',
    svgType: 'bicep_curl_bar'
  },
  {
    id: 'b8',
    name: 'Elevação Lateral / Abdução de Ombros com Halter',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Ombros',
    targetMuscles: ['Deltoide Lateral', 'Deltoide Anterior'],
    equipment: 'Par de Halteres Médios',
    images: ['images/Elevação Lateral com Halteres.png'],
    instructions: [
      'Fique em pé com a espinha reta e halteres ao lado do quadril.',
      'Mantenha joelhos levemente destravados e incline o tronco 5° para a frente.',
      'Eleve os braços lateralmente em arco até a altura dos ombros.',
      'Os cotovelos devem liderar a subida e ficar sutilmente flexionados.',
      'Desça os halteres lentamente controlando a gravidade.'
    ],
    tips: 'Pense em "jogar os halteres para longe, em direção às paredes", e não simplesmente para cima.',
    svgType: 'lateral_raise'
  },
  {
    id: 'c1',
    name: 'Abdominal na Máquina',
    defaultSets: 3,
    defaultReps: '12-15',
    muscleGroup: 'Abdômen',
    targetMuscles: ['Reto Abdominal', 'Oblíquos'],
    equipment: 'Máquina de Abdominal',
    images: ['images/Abdominal na Máquina.png'],
    instructions: [
      'Sente-se na máquina e apoie os pés no suporte inferior.',
      'Segure as manoplas superiores trazendo-as ao lado da cabeça.',
      'Contraia o abdômen flexionando o tronco para a frente de forma controlada.',
      'Retorne devagar resistindo à carga até a posição ereta.'
    ],
    tips: 'Concentre o movimento no abdômen, sem puxar com os braços ou usar impulso das pernas.',
    svgType: 'crunch_machine'
  },
  {
    id: 'c3',
    name: 'Caminhada na Esteira',
    defaultSets: 1,
    defaultReps: '20-30m',
    muscleGroup: 'Cardiovascular',
    targetMuscles: ['Sistema Cardiovascular', 'Quadríceps', 'Panturrilhas'],
    equipment: 'Esteira Ergométrica',
    images: ['images/Esteira Caminhada.png'],
    instructions: [
      'Suba na esteira e prenda a chave de segurança na roupa.',
      'Inicie com velocidade baixa (3.0 a 4.0 km/h) para aquecer por 3 minutos.',
      'Aumente para uma velocidade de caminhada acelerada e confortável (5.0 a 6.0 km/h).',
      'Mantenha a postura ereta, olhando para a frente, e movimente os braços ritmadamente.',
      'Nos últimos 3 minutos, reduza a velocidade de forma gradual para resfriamento.'
    ],
    tips: 'Mantenha um ritmo firme e ative o abdômen para proteger a postura durante a caminhada.',
    svgType: 'treadmill'
  }
];
