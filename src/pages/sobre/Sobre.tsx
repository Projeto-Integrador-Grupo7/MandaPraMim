import { MapPin, Users, Award, Clock, Target, Heart, Zap, Shield, Smile, Truck, Star } from 'lucide-react';
import FotoPaola from '../../assets/img/fotos/Eu.webp';
import FotoJaime from '../../assets/img/fotos/Jaime (4).jpg';
import FotoEloiza from '../../assets/img/fotos/Eloiza Fernandes (3).jpg';
import FotoFelipe from '../../assets/img/fotos/Felipe Macedo (2).jpg';
import FotoNathan from '../../assets/img/fotos/Nathan Ribeiro  (4).jpg';

function Sobre() {

  const stats = [
    { icon: <MapPin size={40} className="text-[#FF5722]" />, number: "15+", label: "Cidades atendidas" },
    { icon: <Users size={40} className="text-[#FF5722]" />, number: "2000+", label: "Clientes satisfeitos" },
    { icon: <Award size={40} className="text-[#FF5722]" />, number: "3", label: "Anos de experiência" },
    { icon: <Clock size={40} className="text-[#FF5722]" />, number: "30min", label: "Tempo médio de entrega" }
  ];

  const values = [
    {
      icon: <Target className="w-12 h-12 text-[#FF5722]" />,
      title: "Qualidade",
      description: "Garantimos a qualidade dos alimentos, selecionando apenas fornecedores e restaurantes parceiros de excelência."
    },
    {
      icon: <Heart className="w-12 h-12 text-[#FF5722]" />,
      title: "Saúde",
      description: "Oferecemos opções para todos os gostos e necessidades dietéticas, incluindo opções saudáveis e nutritivas."
    },
    {
      icon: <Zap className="w-12 h-12 text-[#FF5722]" />,
      title: "Rapidez",
      description: "Entregamos seu pedido no menor tempo possível, sem comprometer a qualidade e a experiência do cliente."
    },
    {
      icon: <Users className="w-12 h-12 text-[#FF5722]" />,
      title: "Comunidade",
      description: "Apoiamos negócios locais e construímos uma comunidade forte entre restaurantes, entregadores e clientes."
    },
    {
      icon: <Shield className="w-12 h-12 text-[#FF5722]" />,
      title: "Segurança",
      description: "Garantimos a segurança dos seus dados e dos alimentos entregues, com protocolos rigorosos de higiene."
    },
    {
      icon: <Smile className="w-12 h-12 text-[#FF5722]" />,
      title: "Satisfação",
      description: "A satisfação dos nossos clientes é nossa prioridade absoluta e nosso principal indicador de sucesso."
    }
  ];

  return (
    <>
      {/* SEÇÃO DO BANNER */}
      <section className="relative h-[500px] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
            backgroundPosition: "center 30%"
          }}
        >
          <div className="absolute inset-0 bg-orange-300 opacity-70"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl font-bold mb-6">Sobre ao Delivery Manda Pra Mim</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Conectando pessoas a sabores incríveis desde 2021. Conheça nossa história,
            missão e os valores que nos tornam referência no mercado de delivery de alimentos no Brasil.
          </p>
        </div>
      </section>

      {/* SEÇÃO DA NOSSA HISTÓRIA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Entregador DeliverEats"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>

            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#FF5722] mb-6">Nossa História</h2>
              <p className="text-gray-700 mb-4">
                Fundada em 2021, o Delivery Manda Pra Mim nasceu com o propósito de revolucionar o mercado de delivery de alimentos no Brasil. O que começou como uma operação local em Cabrobró, hoje se transformou em uma plataforma presente em mais de 15 cidades em todo o país.
              </p>
              <p className="text-gray-700 mb-4">
                Nossa jornada é marcada pela inovação constante, parcerias com os melhores restaurantes e um compromisso inabalável com a satisfação dos nossos clientes. Acreditamos que uma boa refeição vai além do sabor - é sobre experiências, momentos compartilhados e qualidade de vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DOS NOSSOS NÚMEROS */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#FF5722] mb-12">Delivery Manda Pra Mim em Números</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center transform transition-transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-[#FF5722] mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DOS NOSSOS VALORES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#FF5722] mb-4">Nossos Valores</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Os valores que guiam nossas decisões e definem quem somos como empresa.
              Estes princípios são a base de tudo o que fazemos na DeliverEats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#FF5722] mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSSA EQUIPE DE PROFISSIONAIS */}
      <div className="bg-white rounded-lg shadow-lg p-8 gap-8 flex flex-col text-center">
        <h3 className="text-3xl font-bold text-center mb-4 text-[#FF5722]">Nossa Equipe</h3>
        <div className="flex justify-center items-center">
          <div className="grid md:grid-cols-5 gap-8 place-items-center">
            <div className="rounded-lg p-6 shadow-md flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow">
              <img
                src={FotoJaime}
                alt="Foto da Eloiza Fernandes"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h4 className="font-semibold">Product Owner</h4>
                <p className="text-gray-600">Jaime Filho</p>
              </div>
            </div>

            <div className="rounded-lg p-6 shadow-md flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow">
              <img
                src={FotoNathan}
                alt="Foto do Felipe Macedo"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h4 className="font-semibold">Scrum Master</h4>
                <p className="text-gray-600">Nathan Ribeiro</p>
              </div>
            </div>

            <div className="rounded-lg p-6 shadow-md flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow">
              <img
                src={FotoEloiza}
                alt="Foto do Jaime Filho"
                className="rounded-full w-20 h-20 object-cover items-center"
              />
              <div>
                <h4 className="font-semibold">Desenvolvedora</h4>
                <p className="text-gray-600">Eloiza Fernandes</p>
              </div>
            </div>

            <div className="rounded-lg p-6 shadow-md flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow">
              <img
                src={FotoFelipe}
                alt="Foto do Nathan Ribeiro"
                className="rounded-full w-20 h-20 object-cover items-center"
              />
              <div>
                <h4 className="font-semibold">Desenvolvedor</h4>
                <p className="text-gray-600">Felipe Macedo</p>
              </div>
            </div>

            <div className="rounded-lg p-6 shadow-md flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow">
              <img
                src={FotoPaola}
                alt="Foto da Paola Patrícia"
                className="rounded-full w-20 h-20 object-cover items-center"
              />
              <div>
                <h4 className="font-semibold">Desenvolvedora</h4>
                <p className="text-gray-600">Paola Patrícia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sobre;