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
    images: ['https://cdn.awsli.com.br/800x800/363/363752/produto/15234411/d107f8452a.jpg', 'http://irontechfitness.com.br/cdn/shop/files/ExtensorcPolia.jpg?v=1731528700', 'https://http2.mlstatic.com/D_NQ_NP_984225-MLB79968424937_102024-O.webp'],
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
    images: ['https://w7academia.com.br/wp-content/uploads/2026/01/Leg-press-inclinado_-como-usar-o-leg-press-45-para-treinar-pernas-com-seguranca-e-melhores-resultados-scaled.webp', 'https://profitness.com.br/imagens/produtos/4f52c5256b.png', 'https://i.ytimg.com/vi/iUVZfgeepjU/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGQgZChkMA8=&rs=AOn4CLDtS8Q_cRmu6ywrTIcCKRk4-LbR4Q'],
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
    images: ['https://static.wixstatic.com/media/2edbed_6b4ad613c96a47d6af22b0e284ab5a32~mv2.gif/v1/fill/w_980,h_980,al_c,usm_0.66_1.00_0.01,pstr/2edbed_6b4ad613c96a47d6af22b0e284ab5a32~mv2.gif', 'https://img.olx.com.br/images/95/959583581871693.jpg', 'https://pro-fitsport.com/wp-content/uploads/2019/10/pic-1mth085_06.jpg'],
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
    images: ['https://oficialsport.com.br/wp-content/uploads/infinity-adutorabdutor-oficial-s.webp', 'https://oficialsport.com.br/wp-content/uploads/infinity-adutor-oficial-sport-li.webp', 'https://img.olx.com.br/images/95/954538335148480.jpg'],
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
    images: ['https://http2.mlstatic.com/D_NQ_NP_812411-MLB111333389001_052026-O.webp', 'https://img.irroba.com.br/fit-in/1000x1000/filters:fill(fff):quality(80)/natuoaeu/catalog/produtos-2025/academia/equipamentos-de-musculacao/sku-69-barra-guiada-livre-consport/barra-guiada-livre-consport-1.jpg', 'https://i.ytimg.com/vi/rM6SDUdl9fs/maxresdefault.jpg'],
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
    images: ['https://http2.mlstatic.com/D_NQ_NP_768556-MLB72197955474_102023-O-par-de-halteres-10kg-academia-sextavado-emborrachado-cromado.webp', 'https://http2.mlstatic.com/D_NQ_NP_608025-MLB89309986715_082025-O.webp', 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m51ngsxewrps76'],
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
    images: ['https://ajustfitness.com.br/wp-content/uploads/Puxada-Alta-Articulada-SL-2030-ok-768x768.jpg', 'https://oficialsport.com.br/wp-content/uploads/PUXADA-ALTA-CONVERGENTE-scaled.webp', 'https://www.bhfitnessequipamentos.com.br/doutor/uploads/6/produtos/2025/01/cover-puxada-alta-convergente-a4618de554.jpg'],
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
    images: ['https://http2.mlstatic.com/D_NQ_NP_879798-MLB83596510699_042025-O.webp', 'https://i0.wp.com/portico.com.br/wp-content/uploads/2022/04/FS2060-3.jpg?fit=800%2C800&ssl=1', 'https://hexastrong.com.br/wp-content/uploads/2024/01/IMG-20230426-WA0054.jpg'],
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
    images: ['https://img.olx.com.br/images/98/983529255578288.jpg', 'https://img.olx.com.br/images/68/685566640304599.jpg', 'https://megagym.com.br/cdn/shop/files/Barra_Reta_-_Ficha_Informativa_-_1200x1200_27b17d94-6b50-44f2-adb2-ef547ef50501.png?v=1739563744&width=1000'],
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
    name: 'Bíceps Pulley',
    defaultSets: 3,
    defaultReps: '10',
    muscleGroup: 'Bíceps',
    targetMuscles: ['Bíceps Braquial', 'Braquiorradial'],
    equipment: 'Estação de Polia (Cabo Inferior com Barra Reta/W)',
    images: ['https://images.tcdn.com.br/img/img_prod/937852/polia_academia_crossover_podiumfit_mc100_fixa_esta_1_20250927224948_db2b16d471d8.jpg', 'https://megagym.com.br/cdn/shop/files/Foto_de_capa_-_MegaRack_Crossover_-_Anuncio_Site_-_1200x1600_b9a015f5-9151-4231-9871-3031d8a61ad7.png?v=1755778908&width=1038', 'https://static.netshoes.com.br/produtos/polia-alta-e-baixa-com-banco/06/14E-0198-006/14E-0198-006_zoom1.jpg?ts=1651745837'],
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
    images: ['https://astracomercio.com.br/wp-content/uploads/2024/12/AST-EE100B-scaled.jpg', 'https://defitness.fbitsstatic.net/img/p/esteira-eletrica-ergometrica-speedo-tr8-pro-profissional-para-corridas-com-painel-touch-screen-e-wi-fi-70270/256700-4.jpg?w=1000&h=1000&v=no-change&qs=ignore', 'https://http2.mlstatic.com/D_NQ_NP_859144-MLU71504780237_092023-O.webp'],
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
    images: ['https://images.tcdn.com.br/img/img_prod/1358169/cadeira_mesa_flexora_e_extensora_carga_80_kg_exercit_669_variacao_43_4_76d9a440208402571954fd9bc8f4d2e6.jpg', 'https://images.tcdn.com.br/img/img_prod/1358169/cadeira_mesa_flexora_e_extensora_carga_80_kg_exercit_669_4_ce7dbba1f8ebc1e3e386052f8e7a37bd.jpeg', 'https://img.olx.com.br/images/20/202686484643583.jpg'],
    instructions: [
      'Sente-se posicionando a parte de trás do joelho colada na dobra do banco.',
      'Ajuste o apoio almofadado acima do tendão de Aquiles.',
      'Abaixe o fixador de coxa com firmeza para prender suas pernas.',
      'Flexione os joelhos para baixo e para trás, trazendo os calcanhares abaixo da cadeira.',
      'Retorne estendendo lentamente as pernas de volta.'
    ],
    tips: 'Mantenha os pés fletidos (dedos apontados para o teto) para recrutar mais intensamente os posteriores.',
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
    images: ['https://meutreinador.com/wp-content/uploads/2024/04/Cadeira-Abdutora.webp', 'https://img.olx.com.br/images/95/954538335148480.jpg', 'https://oficialsport.com.br/wp-content/uploads/infinity-adutorabdutor-oficial-s.webp'],
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
    images: ['https://down-br.img.susercontent.com/file/sg-11134201-7qvef-lh6b5k25qsqv1a', 'https://images.tcdn.com.br/img/img_prod/1042861/kit_academia_fitness_com_2_halteres_de_2kg_e_1_kettlebell_de_4kg_1655_2_c46d19b7f933e66ed69b1c607f8039e3.jpg', 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/5471c964-eb0e-42d3-b3ac-ecbcbc4ca3ba.__CR0,0,970,600_PT0_SX970_V1___.jpg'],
    instructions: [
      'Fique de pé com um afastamento bem largo das pernas (posição de sumô).',
      'Aponte as pontas dos pés para fora em um ângulo confortável (~45°).',
      'Segure o halter de pé por uma das extremidades, estendendo os braços para baixo.',
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
    images: ['https://cdn.fisiculturismo.com.br/monthly_2021_01/panturrilha-em-pe-na-maquina-final.jpg.f4593e71d2b363fe9996773a417b8aec.jpg', 'https://www.xfitnessequipamentos.com.br/wp-content/uploads/2021/04/panturrilha-em-pe-maquina2-600x600.jpg', 'https://i.ytimg.com/vi/95MEoNZKaP0/maxresdefault.jpg'],
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
    images: ['https://i.pinimg.com/736x/d8/3b/ca/d83bcaf100a1170fc29553017f1121ea.jpg', 'https://i.pinimg.com/originals/e6/74/ce/e674ce521e526a0d8bf933d8b235f8f6.jpg', 'https://www.flex.ind.br/wp-content/uploads/2019/05/peitoral-peck-deck-fly-voador-academia-FLEX-fitness-400x400.png'],
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
    images: ['https://casadofitness.vtexassets.com/arquivos/ids/157298/supino-horizontal-articulado-starke-ironpl-amv18_0.jpg?v=638932956913570000', 'https://images.tcdn.com.br/img/img_prod/450774/supino_reto_articulada_ultrawod_1433_1_59c53d5e7c137ee117f1819feea2daab.png', 'https://www.konnenfitness.com.br/assets/uploads/produtos/BL10-LAYDOWN-CHEST-PRESS.png'],
    instructions: [
      'Sente-se com as costas bem firmadas e os pés apoiados no chão.',
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
    images: ['https://www.kikos.com.br/media/catalog/product/cache/9a42fbf5bf4693a5288cbf9975a24d98/h/f/hf-2013---supino-inclinado---linha-hammer-force---kikos-pro-_site_.jpg', 'https://static.wixstatic.com/media/2edbed_68da0d35b2994cb1acf7a3fec4116081~mv2.webp/v1/fill/w_360,h_360,al_c,q_80,enc_avif,quality_auto/2edbed_68da0d35b2994cb1acf7a3fec4116081~mv2.webp', 'https://http2.mlstatic.com/D_NQ_NP_706630-MLB80121748506_112024-O-banco-supino-inclinado-convergente-profissional-academia.webp'],
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
    images: ['https://images.tcdn.com.br/img/img_prod/1042861/par_de_halteres_redondo_emborrachado_5_kg_azul_1517_2_f9a6562ecb8d01d60e19469c599d9ad3.jpg', 'https://static.netshoes.com.br/produtos/par-de-halteres-dumbell-ciment-sextavado-bonafit-3kg-preto/06/FC5-0046-006/FC5-0046-006_zoom1.jpg?ts=1661910933', 'https://http2.mlstatic.com/D_NQ_NP_608025-MLB89309986715_082025-O.webp'],
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
    images: ['https://grandeatleta.com.br/wp-content/uploads/2018/08/triceps-pulley-corda-na-polia.jpg', 'https://i.ytimg.com/vi/wQdCw93LkcI/maxresdefault.jpg', 'https://d1fitness.com.br/cdn/shop/products/par-puxador-corda-emborrachada-treino-barra-reta-medidas-triceps-biceps-pulley-crossover-d1fitness_9a61ddfc-cb6f-4db7-8293-e7466aecfcda.jpg?v=1695293807&width=1100'],
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
    images: ['https://grandeatleta.com.br/wp-content/uploads/2018/08/triceps-pulley-corda-na-polia.jpg', 'https://treinomestre.com.br/wp-content/uploads/2018/10/pulley-frente-puxador-.jpg', 'https://i.ytimg.com/vi/wQdCw93LkcI/maxresdefault.jpg'],
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
    name: 'Esteira Cardio',
    defaultSets: 1,
    defaultReps: '20-30m',
    muscleGroup: 'Cardiovascular',
    targetMuscles: ['Sistema Cardiovascular', 'Quadríceps', 'Panturrilhas'],
    equipment: 'Esteira Ergométrica',
    images: ['https://astracomercio.com.br/wp-content/uploads/2024/12/AST-EE100B-scaled.jpg', 'https://http2.mlstatic.com/D_NQ_NP_859144-MLU71504780237_092023-O.webp', 'https://images.tcdn.com.br/img/img_prod/645555/esteira_eletrica_rtx900s_amortecedores_hidraulicos_com_molas_inclinacao_eletronica_lona_larga_46cm_765_5_ddeaa15f6f33a1cd447b8561bedea690.jpg'],
    instructions: [
      'Inicie com um aquecimento lento por 3 a 5 minutos.',
      'Aumente a velocidade ou inclinação para um nível moderado (zona de queima de gordura/aeróbica).',
      'Mantenha a postura ereta e os braços relaxados e sincronizados.',
      'Respire de forma profunda e compassada.',
      'Reduza gradualmente a velocidade nos últimos 3 minutos para resfriamento.'
    ],
    tips: 'Ideal para finalizar o treino e acelerar a recuperação muscular global.',
    svgType: 'treadmill'
  }
];
