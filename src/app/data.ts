import { TopicsInterface } from "./components/topics/TopicModal";

export const topics: TopicsInterface[] = [
  {
    title: "Servicios en línea",
    content: [
      {
        subtitle: "Pagos y exámenes",
        items: [
          { name: "Aranceles", description: "Conoce los valores", icon: "🔍" },
          {
            name: "Presupuesto cirugía y parto",
            description: "Solicita tu cotización",
            icon: "🩺",
          },
          {
            name: "Pago de cuentas",
            description: "Ambulatorio y hospitalización",
            icon: "💳",
          },
          {
            name: "Agendar exámenes",
            description: "Reserva tus exámenes",
            icon: "📅",
          },
          {
            name: "Simulador de copago",
            description: "Calcula tu costo estimado",
            icon: "🧑🏻‍💻",
          },
          {
            name: "Resultados",
            description: "Descarga informes e imágenes",
            icon: "📄",
          },
        ],
      },
      {
        subtitle: "Información hospitalaria",
        items: [
          {
            name: "Proceso de alta",
            description: "Conócelo en detalle",
            icon: "✅",
          },
          {
            name: "Estado de cuenta",
            description: "Revisa avances y pagos",
            icon: "📊",
          },
          {
            name: "Información clave",
            description: "Todo el proceso hospitalario",
            icon: "ℹ️",
          },
        ],
      },
      {
        subtitle: "Reservas y modalidades",
        items: [
          { name: "Presencial", description: "Ve a una sucursal", icon: "🏢" },
          { name: "Telemedicina", description: "Consulta virtual", icon: "💻" },
          { name: "Teleurgencia", description: "Síntomas agudos", icon: "🚨" },
          {
            name: "A domicilio",
            description: "Atención en tu hogar",
            icon: "🏠",
          },
          {
            name: "Procedimientos",
            description: "Agenda pruebas médicas",
            icon: "🧪",
          },
        ],
      },
    ],
  },
  {
    title: "Especialidades y médicos",
    content: [
      {
        subtitle: "Nuestros servicios",
        items: [
          {
            name: "Servicios clínicos",
            description: "Conoce lo que ofrecemos",
            icon: "🏥",
          },
          {
            name: "Especialidades",
            description: "Más de 60 disponibles",
            icon: "🩺",
          },
          {
            name: "Nuestros médicos",
            description: "Busca por área",
            icon: "👨‍⚕️",
          },
          {
            name: "Sucursales",
            description: "Encuentra la más cercana",
            icon: "📍",
          },
        ],
      },
    ],
  },
  {
    title: "Seguros y convenios",
    content: [
      {
        subtitle: "Seguros",
        items: [
          {
            name: "Alemana Seguros",
            description: "Elige el mejor plan",
            icon: "🛡️",
          },
          {
            name: "Todo Alemana",
            description: "Revisa nuestros planes",
            icon: "📋",
          },
          {
            name: "Isapres preferentes",
            description: "Cobertura en la clínica",
            icon: "🏥",
          },
        ],
      },
      {
        subtitle: "Convenios",
        items: [
          {
            name: "Accidentes",
            description: "Protege a tu familia",
            icon: "🛡️",
          },
          {
            name: "Instituciones",
            description: "Colabora con nosotros",
            icon: "🤝",
          },
        ],
      },
    ],
  },
  {
    title: "Prevención y educación",
    content: [
      {
        subtitle: "Bienestar personal",
        items: [
          {
            name: "Chequeos preventivos",
            description: "Programas y exámenes",
            icon: "❤️‍🩹",
          },
          {
            name: "Nutrición",
            description: "Aprende a alimentarte bien",
            icon: "🥗",
          },
          { name: "Salud mental", description: "Recursos y apoyo", icon: "🧠" },
        ],
      },
      {
        subtitle: "Bienestar empresa",
        items: [
          {
            name: "Salud empresa",
            description: "Cuida a tus colaboradores",
            icon: "💼",
          },
        ],
      },
    ],
  },
];

export const atentionTypes = [
  { label: "Presencial", value: "presencial" },
  { label: "Online", value: "remote" },
  { label: "A domicilio", value: "onSite" },
];

export const services = [
  {
    label: "Abogado",
    value: "lawyer",
    category_label: "Legal",
    category_value: "legal",
  },
  {
    label: "Contador",
    value: "accountant",
    category_label: "Legal",
    category_value: "legal",
  },
  {
    label: "Terapeuta",
    value: "therapist",
    category_label: "Salud",
    category_value: "health",
  },
  {
    label: "Médico general",
    value: "doctor",
    category_label: "Salud",
    category_value: "health",
  },
  {
    label: "Dentista",
    value: "dentist",
    category_label: "Salud",
    category_value: "health",
  },
  {
    label: "Psicólogo",
    value: "psychologist",
    category_label: "Salud",
    category_value: "health",
  },
  {
    label: "Arquitecto",
    value: "architect",
    category_label: "Construcción",
    category_value: "construction",
  },
  {
    label: "Ingeniero civil",
    value: "civil_engineer",
    category_label: "Construcción",
    category_value: "construction",
  },
  {
    label: "Constructor",
    value: "builder",
    category_label: "Construcción",
    category_value: "construction",
  },
];
