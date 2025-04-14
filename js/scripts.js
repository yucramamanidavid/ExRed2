document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const questionsContainer = document.querySelector('.questions-container');
    const toggleAnswersBtn = document.getElementById('toggle-answers');
    const searchInput = document.getElementById('search');
    
    // Verificar si los elementos clave existen
    if (!questionsContainer) {
        console.error('No se encontró el contenedor de preguntas (questions-container).');
        return;
    }
    if (!toggleAnswersBtn) {
        console.error('No se encontró el botón de "toggle-answers".');
        return;
    }
    if (!searchInput) {
        console.error('No se encontró el campo de búsqueda (search).');
        return;
    }
    // Todas las 68 preguntas con respuestas y explicaciones
    const questions = [
        // Preguntas 1-10
        {
            number: 1,
            text: "¿Qué protocolo aumenta la seguridad en las conexiones remotas?",
            options: ["HTTP", "NetBEUI", "POP", "FTP", "SSH"],
            answer: "SSH",
            explanation: "SSH proporciona conexiones seguras y encriptadas a dispositivos remotos."
        },
        {
            number: 2,
            text: "¿Cuál es una característica de una interfaz de bucle invertido IPv4 en un router Cisco IOS?",
            options: [
                "Se asigna a un puerto físico y puede conectarse a otros dispositivos.",
                "Es una interfaz lógica interna del router.",
                "Solo se puede habilitar una interfaz de bucle invertido en un router.",
                "No se requiere el comando no shutdown para colocar esta interfaz en estado UP (activo)."
            ],
            answer: "Es una interfaz lógica interna del router.",
            explanation: "La interfaz de bucle invertido es una interfaz lógica interna del router y se coloca automáticamente en estado UP (activo), siempre que el router esté en funcionamiento. Esta no se asigna a un puerto físico y, por lo tanto, nunca se puede conectar a otro dispositivo. Se pueden habilitar varias interfaces de bucle invertido en un router."
        },
        {
            number: 3,
            text: "¿Después de qué paso de la secuencia de arranque del switch se ejecuta el gestor de arranque?",
            options: [
                "después de la localización de IOS",
                "después de la ejecución POST",
                "después de la inicialización de la CPU",
                "después de la inicialización del sistema de archivos flash"
            ],
            answer: "después de la ejecución POST",
            explanation: "El orden correcto de la secuencia de arranque es el siguiente: 1.- El switch carga y ejecuta POST.2.- El switch carga el software del gestor de arranque.3.- El gestor de arranque realiza la inicialización de CPU de bajo nivel.4.- El gestor de arranque inicializa la memoria flash. 5.- El gestor de arranque localiza y carga la imagen de IOS predeterminada."
        },
        {
            number: 4,
            text: "¿Qué repercusión tendrá en una red agregar un switch de capa 2?",
            options: [
                "un aumento de la cantidad de tramas descartadas",
                "un aumento del tamaño del dominio de difusión",
                "un aumento de la cantidad de colisiones de red",
                "un aumento del tamaño del dominio de colisión"
            ],
            answer: "Aun aumento del tamaño del dominio de difusión",
            explanation: " Agregar un switch de capa 2 a una red aumenta la cantidad de dominios de colisión y aumenta el tamaño del dominio de difusión. Los switches de capa 2 no reducen la cantidad de tráfico de difusión, no aumentan la cantidad de colisiones de la red y no aumentan la cantidad de tramas descartadas."
        },
        {
            number: 5,
            text: "¿Qué característica describe el switching por método de corte?",
            options: [
                "Solo las tramas de salida se revisan para detectar errores.",
                "Se reenvían los fragmentos sin errores, así que el switching ocurre con una latencia más baja.",
                "El almacenamiento en búfer se utiliza para admitir diferentes velocidades de Ethernet.",
                "Las tramas se reenvían sin ninguna verificación de errores."
            ],
            answer: "Las tramas se reenvían sin ninguna verificación de errores.",
            explanation: "El switching por método de corte reduce la latencia mediante el reenvío de tramas ni bien se leen la dirección MAC de destino y el puerto de switch correspondiente de la tabla de direcciones MAC. Este método de switching no realiza ninguna verificación de errores ni usa los búferes para admitir diferentes velocidades de Ethernet. La verificación de errores y los búferes son características de switching de almacenamiento y envío."
        },
        {
            number: 6,
            text: "¿Qué afirmación es correcta acerca de las decisiones de reenvío de tramas del switch Ethernet?",
            options: [
                "Solo las tramas con una dirección de destino de difusión se reenvían a todos los puertos del switch activos.",
                "El reenvío de tramas por método de corte garantiza que siempre se descarten las tramas no válidas.",
                "Las decisiones de reenvío de tramas se basan en la asignación de puertos y la dirección MAC en la tabla CAM.",
                "Las tramas de unidifusión siempre se reenvían, independientemente de la dirección de destino MAC."
            ],
            answer: "Las decisiones de reenvío de tramas se basan en la asignación de puertos y la dirección MAC en la tabla CAM.",
            explanation: "El reenvío de tramas por método de corte solo lee hasta los primeros 22 bytes de una trama, lo que excluye la secuencia de verificación de tramas, por lo que pueden reenviarse las tramas no válidas. Además de las tramas de difusión, las tramas con una dirección de destino MAC que no están en la CAM también se envían a todos los puertos activos. Las tramas de unidifusión no siempre se reenvían. Las tramas recibidas con una dirección MAC de destino asociada al puerto del switch en que se recibe no se reenvían porque el destino existe en el segmento de red conectado al puerto."
        },
        {
            number: 7,
            text: "¿Qué información de las tramas entrantes se agrega a la tabla del switch?",
            options: [
                "La dirección MAC de destino y el número de puerto de entrada",
                "La dirección MAC de origen y el número de puerto de entrada",
                "La dirección IP de origen y el número de puerto de entrada",
                "La dirección IP de destino y el número de puerto de entrada"
            ],
            answer: "La dirección MAC de origen y el número de puerto de entrada",
            explanation: "Un switch «descubre» o construye la tabla de direcciones MAC en función de la dirección MAC de origen cuando una trama ingresa al switch. Un switch reenvía la trama siguiente según la dirección MAC de destino."
        },
        {
            number: 8,
            text: "Consulte la ilustración. ¿Cuántos dominios de difusión se muestran?",
            options: ["4", "55", "16", "8"],
            answer: "8",
            explanation: "Un router define un límite de difusión, por lo que cada enlace entre dos routers es un dominio de difusión. En la ilustración, 4 enlaces entre routers conforman 4 dominios de difusión. Además, cada LAN conectada a un router es un dominio de difusión. Las 4 LAN en la ilustración dan como resultado 4 dominios más de difusión, por lo que hay 8 dominios de difusión en total.",
            image: "img/1.png"
        },
        {
            number: 9,
            text: "¿Cuáles son las dos situaciones en las que un administrador debe inhabilitar DTP mientras administra una red de área local? (Elija dos).",
            options: [
                "En enlaces que deben intentar formar enlaces troncales dinámicos.",
                "Cuando un switch vecino usa un modo de DTP dinámico deseado.",
                "Cuando se conecta un switch Cisco a un switch que no es de Cisco.",
                "Cuando un switch vecino usa un modo de DTP dinámico automático.",
                "En enlaces que no deben ser troncales."
            ],
            answer: ["Cuando se conecta un switch Cisco a un switch que no es de Cisco.", "En enlaces que no deben ser troncales."],
            explanation: "La práctica recomendada de Cisco consiste en inhabilitar DTP en los enlaces cuando no se deben usar enlaces troncales y cuando se conecta un switch Cisco a un switch que no es de Cisco. DTP se requiere para la negociación de enlaces troncales dinámicos."
        },
        {
            number: 10,
            text: "¿Cuáles son las dos características que describen la VLAN nativa? (Elija dos).",
            options: [
                "El tráfico de VLAN nativa no tiene etiquetas en todo el enlace troncal.",
                "La VLAN nativa proporciona un identificador común para ambos extremos del enlace troncal.",
                "Diseñadas para transportar el tráfico que generan los usuarios, este tipo de VLAN también se conoce como “VLAN predeterminada”.",
                "Esta VLAN se necesita para la administración remota de un switch.",
                "El tráfico de prioridad alta, como el tráfico de voz, usa la VLAN nativa."
            ],
            answer: ["El tráfico de VLAN nativa no tiene etiquetas en todo el enlace troncal.", "La VLAN nativa proporciona un identificador común para ambos extremos del enlace troncal."],
            explanation: "La VLAN nativa se asigna a los enlaces troncales 802.1Q para proporcionar un identificador común en ambos extremos del enlace troncal. Cualquier sea el número nativo de VLAN que se asigne a un puerto, o si el puerto es la VLAN predeterminada 1, el puerto no etiqueta ninguna trama en esa VLAN ya que el tráfico se desplaza a través del enlace troncal. En el otro extremo del enlace, el dispositivo receptor que no ve ninguna etiqueta conoce el número de VLAN específica porque el dispositivo receptor debe tener el número exacto de la VLAN nativa. La VLAN nativa debe ser una VLAN sin utilizar que sea distinta de la VLAN1, que es la VLAN predeterminada, además de otras VLAN. Las VLAN de datos, también conocidas como VLAN de usuarios, se configuran para transportar el tráfico generado por los usuarios, excepto el tráfico de alta prioridad, como el VoIP. Las VLAN de voz se configuran para el tráfico VoIP. La VLAN de administración se configura para proporcionar acceso a las capacidades de administración de un switch."
        },

        // Preguntas 11-20
        {
            number: 11,
            text: "Una red contiene varias VLAN que abarcan varios switches. ¿Qué sucede cuando un dispositivo en la VLAN 20 envía una trama de Ethernet de difusión?",
            options: [
                "Solo los dispositivos de la VLAN 20 ven la trama.",
                "Todos los dispositivos de todas las VLAN ven la trama.",
                "Solo los dispositivos que están conectados al switch local ven la trama.",
                "Los dispositivos de la VLAN 20 y la VLAN de administración ven la trama."
            ],
            answer: "Solo los dispositivos de la VLAN 20 ven la trama.",
            explanation: "Las VLAN crean dominios de difusión lógicos que pueden abarcar varios segmentos de VLAN. Las tramas de Ethernet que se envían mediante un dispositivo en una VLAN específica solo pueden ser vistas por otros dispositivos en la misma VLAN."
        },
        {
            number: 12,
            text: "Consulte la exhibición. Todas las estaciones de trabajo están configuradas correctamente en la VLAN 20. Las estaciones de trabajo que están conectadas al switch SW1 no pueden enviar tráfico a las estaciones de trabajo en el SW2. ¿Qué se puede hacer para solucionar el problema?",
            options: [
                "Habilitar el DTP en ambos extremos del troncal.",
                "Permitir la VLAN 20 en el enlace troncal.",
                "Configurar todas las estaciones de trabajo en el SW2 para que formen parte de la VLAN nativa.",
                "Configurar todas las estaciones de trabajo en el SW1 para que formen parte de la VLAN predeterminada."
            ],
            answer: "Permitir la VLAN 20 en el enlace troncal.",
            explanation: "Si se habilita el DTP en ambos switches, sencillamente se permite la negociación del enlace troncal. La línea de “negociación de enlace troncal” en el gráfico muestra que el DTP ya está habilitado. El gráfico también muestra cómo la VLAN nativa es 1, y la VLAN predeterminada para cualquier switch Cisco es 1. El gráfico muestra que los equipos deben estar en la VLAN 20.",
            image: "img/2.jpg"
        },
        {
            number: 13,
            text: "¿Qué ocurre con los puertos de switch después de eliminar la VLAN a la que están asignados?",
            options: [
                "Los puertos dejan de comunicarse con los dispositivos conectados.",
                "Los puertos se desactivan.",
                "Los puertos se colocan en el modo de enlace troncal.",
                "Los puertos se asignan a la VLAN1, la VLAN predeterminada.",
                "Los puertos afectados se deben volver a configurar para una VLAN activa."
            ],
            answer: "Los puertos dejan de comunicarse con los dispositivos conectados.",
            explanation: "Los puertos afectados se deben volver a configurar para una VLAN activa."
        },
        {
            number: 14,
            text: "Se asignó el puerto Fa0/11 de un switch a la VLAN 30. Si se introduce el comando no switchport access vlan 30 en la interfaz Fa0/11, ¿qué sucede?",
            options: [
                "El puerto Fa0/11 se desactiva.",
                "El puerto Fa0/11 regresa a la VLAN 1.",
                "Se elimina la VLAN 30.",
                "Se mostraría un mensaje de error."
            ],
            answer: "El puerto Fa0/11 regresa a la VLAN 1.",
            explanation: "Cuando se introduce el comando no switchport access vlan , el puerto regresa a la VLAN 1 predeterminada. El puerto permanece activo como miembro de la VLAN 1, y la VLAN 30 sigue intacta, incluso si no se asocia a ningún otro puerto."
        },
        {
            number: 15,
            text: "¿Qué comando muestra el tipo de encapsulación, la ID de VLAN de voz y la VLAN de modo de acceso para la interfaz Fa0/1?",
            options: [
                "show vlan brief",
                "show mac address-table interface Fa0/1",
                "show interfaces trunk",
                "show interfaces Fa0/1 switchport"
            ],
            answer: "show interfaces Fa0/1 switchport",
            explanation: "El comando show interfaces switchport muestra la siguiente información para un puerto determinado: Modo administrativo del puerto de switch, Modo de funcionamiento, Encapsulación de enlaces troncales administrativos, Encapsulación de enlaces troncales operativos, Negociación de enlaces troncales, VLAN en modo de acceso, VLAN en modo nativo de enlaces troncales, Etiquetado de VLAN nativa administrativa, VLAN de voz."
        },
        {
            number: 16,
            text: "Consulte la ilustración. Un técnico programa el switch SW3 para administrar el tráfico de voz y de datos a través del puerto Fa0/20. ¿Qué problema, si existiera, hay en la configuración?",
            options: [
                "El comando mls qos trust cos debe hacer referencia a VLAN 35.",
                "No hay ningún problema en la configuración.",
                "El comando utilizado para asignar la red VLAN de voz al puerto de switch es incorrecto.",
                "La interfaz Fa0/20 solo puede tener una VLAN asignada."
            ],
            answer: "El comando utilizado para asignar la red VLAN de voz al puerto de switch es incorrecto.",
            explanation: "La red VLAN de voz debe estar configurada con el comando switchport voice vlan 150 . Una interfaz de switch puede configurarse para admitir una red VLAN de datos y una red VLAN de voz. El comando mls qos trust cos se vincula a la interfaz. El tráfico de voz debe ser confiable para que los campos dentro del paquete de voz puedan utilizarse para clasificarlo para QoS.",
            image: "img/3.jpg"
        },
        {
            number: 17,
            text: "Consulte la exhibición. Un administrador de red ha configurado el router CiscoVille con los comandos anteriores, para proporcionar routing entre redes VLAN. ¿Qué comando se requiere en un switch que está conectado a la interfaz Gi0/0 del router CiscoVille para permitir el routing entre VLAN?",
            options: [
                "switchport mode access",
                "switchport mode dynamic desirable",
                "switchport mode trunk",
                "no switchport"
            ],
            answer: "switchport mode trunk",
            explanation: "Cuando se configuran para el routing entre VLAN, los routers no admiten el protocolo de enlace troncal dinámico utilizado por los switches. Para que las configuraciones de router-on-a-stick funcionen, un switch conectado debe utilizar el comando switchport mode trunk .",
            image: "img/4.jpg"
        },
        {
            number: 18,
            text: "Cuando se enruta un gran número de VLAN, ¿cuáles de las siguientes son dos desventajas de usar el método de routing entre VLAN de router-on-a-stick en lugar del método de routing entre VLAN de switch multicapa? (Elija dos).",
            options: [
                "Se necesitan varias SVI.",
                "El método de router-on-a-stick requiere varias interfaces físicas en un router.",
                "El hecho de que haya varias subinterfaces puede afectar la velocidad del flujo de tráfico.",
                "El método de router-on-a-stick requiere que se configuren subinterfaces en las mismas subredes.",
                "Se requiere un router dedicado."
            ],
            answer: ["El hecho de que haya varias subinterfaces puede afectar la velocidad del flujo de tráfico.", "Se requiere un router dedicado."],
            explanation: "Con el método de routing entre VLAN de router-on-a-stick, se requiere un router dedicado. Solo necesita una interfaz física en el router para enrutar el tráfico entre varias VLAN, usando subinterfaces en una interfaz física. Por otra parte, dado que el tráfico de todas las VLAN tendrá que atravesar las mismas interfaces físicas, el rendimiento será afectado. Además, un switch multicapa puede utilizar varias SVI para realizar el routing entre VLAN."
        },
        {
            number: 19,
            text: "Consulte la exhibición. Un administrador de red ha configurado el router CiscoVille con los comandos anteriores, para proporcionar routing entre redes VLAN. ¿Qué tipo de puerto se requiere en un switch que está conectado a Gi0/0 en el router CiscoVille para permitir el routing entre VLAN?",
            options: [
                "Puerto de enlace troncal",
                "Puerto de acceso",
                "Puerto enrutado",
                "SVI"
            ],
            answer: "Puerto de enlace troncal",
            explanation: "Para que una configuración de router-on-a-stick funcione, se debe conectar un switch al router por medio de un puerto de enlace troncal, para transportar las VLAN que se deben incluir en el routing. Se puede usar una SVI en un switch de multicapa, donde el switch está ejecutando el routing entre redes VLAN.",
            image: "img/5.jpg"
        },
        {
            number: 20,
            text: "¿Cuál es una de las características de un puerto enrutado en un switch de capa 3?",
            options: [
                "No se asigna a una VLAN.",
                "Admite enlaces troncales.",
                "Por lo general, se utiliza como enlace WAN.",
                "No puede tener una dirección IP asignada."
            ],
            answer: "No se asigna a una VLAN.",
            explanation: "Por lo general, se utiliza un puerto enrutado en un switch de capa 3 para realizar la conexión entre la distribución y los switches de capa principal, o entre un switch de capa 3 y un router. Este puerto no tiene VLAN o comandos de enlaces troncales asignados. En su lugar, el puerto está programado con una dirección IP. Esto se utiliza comúnmente cuando se configura el routing estático en el switch o cuando se ejecuta un protocolo de routing entre el switch de capa 3, y el router u otro switch de capa 3."
        },

        // Preguntas 21-30
        {
            number: 21,
            text: "Consulte la exhibición. Un administrador de red debe configurar router-on-a-stick para las redes que se muestran. ¿Cuántas subinterfaces debe crear en el router si cada VLAN que se muestra se debe enrutar y cada VLAN tiene su propia subinterfaz?",
            options: ["2", "1", "3", "4", "5"],
            answer: "4",
            explanation: "Sobre la base de las direcciones IP y las máscaras dadas, la computadora, la impresora, el teléfono IP y la VLAN de administración del switch se encuentran en VLAN diferentes. Esta situación requiere cuatro subinterfaces en el router.",
            image: "img/6.jpg"
        },
        {
            number: 22,
            text: "Un técnico está configurando un nuevo switch Cisco 2960. ¿Cuál es el efecto de emitir el comando branchSW (config-if) # mdix auto ?",
            options: [
                "Ajusta automáticamente el puerto para permitir que las conexiones del dispositivo utilicen un cable directo o un cable cruzado.",
                "Permite configurar una dirección IPv6 en una interfaz física de switch.",
                "Aplica una dirección IPv4 a la interfaz virtual.",
                "Aplica una dirección IPv6 a la interfaz virtual.",
                "Actualiza la tabla de direcciones MAC para el puerto asociado."
            ],
            answer: "Ajusta automáticamente el puerto para permitir que las conexiones del dispositivo utilicen un cable directo o un cable cruzado.",
            explanation: "El comando mdix auto habilita auto-MDIX, lo que permite que el puerto detecte automáticamente el tipo de cable (directo o cruzado) y ajuste la conexión en consecuencia."
        },
        {
            number: 23,
            text: "Consulte la exhibición. Un administrador de red configuró el R1 tal como se muestra. Cuando el administrador revisa el estado de la interfaz serial, esta se muestra como administrativamente down (administrativamente inactiva). ¿Qué comando adicional se debe introducir en la interfaz serial del R1 para activarla?",
            options: ["Final", "clockrate 128000", "no shutdown", "IPv6 enable"],
            answer: "no shutdown",
            explanation: "De forma predeterminada, todas las interfaces del router se apagan. Para activar las interfaces, un administrador debe ejecutar el comando no shutdown en el modo de interfaz.",
            image: "img/7.jpg"
        },
        {
            number: 24,
            text: "Consulte la ilustración. El administrador de red quiere configurar el Switch1 para permitir las conexiones SSH y prohibir las conexiones Telnet. ¿Cómo debe cambiar el administrador de red la configuración que se despliega para cumplir con el requisito?",
            options: [
                "Con la versión 1 del SSH.",
                "Reconfigura la clave RSA.",
                "Modifique el comando transport input.",
                "Configura el SSH en una línea diferente."
            ],
            answer: "Modifique el comando transport input.",
            explanation: "El comando transport input controla los protocolos permitidos en una línea virtual (VTY). Para permitir solo SSH, el comando debe ser transport input ssh.",
            image: "img/8.jpg"
        },
        {
            number: 25,
            text: "¿Qué solución ayudaría a una universidad a aliviar la congestión de la red debido a colisiones?",
            options: [
                "Un router con tres puertos Ethernet",
                "Un router con dos puertos Ethernet",
                "Un switch de alta densidad de puertos",
                "Un firewall que se conecta a dos proveedores de Internet"
            ],
            answer: "Un switch de alta densidad de puertos",
            explanation: "Los switches permiten la microsegmentación para que un dispositivo no compita por el mismo ancho de banda de la red Ethernet con otro dispositivo de la red, eliminando prácticamente todas las colisiones. Un switch de alta densidad de puertos brinda una conectividad muy rápida a muchos dispositivos."
        },
        {
            number: 26,
            text: "Consulte la exhibición. Un administrador de red configura el routing entre VLAN en una red. De momento, solo se usa una VLAN, pero pronto se agregarán más. ¿Cuál es el parámetro que falta y que se muestra como signo de interrogación destacado en el gráfico?",
            options: [
                "El que identifica el número de VLAN.",
                "El que identifica la subinterfaz.",
                "El que identifica el tipo de encapsulación que se utiliza.",
                "El que identifica la cantidad de hosts que se permiten en la interfaz.",
                "El que identifica el número de VLAN nativa."
            ],
            answer: "El que identifica el número de VLAN.",
            explanation: "El comando completo sería encapsulation dot1q 7. La parte encapsulation dot1q del comando admite enlaces troncales e identifica el tipo de enlace troncal a utilizar. El 7 identifica el número de VLAN.",
            image: "img/9.jpg"
        },
        {
            number: 27,
            text: "¿Qué tipo de VLAN se usa para indicar qué tráfico está sin etiquetar al cruzar un puerto de enlace troncal?",
            options: ["Datos", "predeterminado", "Nativa", "de archivos"],
            answer: "Nativa",
            explanation: "Una VLAN nativa es la VLAN que no recibe una etiqueta VLAN en el encabezado de tramas IEEE 802.1Q. Las mejores prácticas de Cisco recomiendan el uso de una VLAN sin utilizar (no una red VLAN de datos, la VLAN predeterminada de VLAN 1 o la VLAN de administración) como VLAN nativa siempre que sea posible."
        },
        {
            number: 28,
            text: "Un administrador de redes emite el comando show vlan brief cuando soluciona el problema de un ticket de soporte de usuario. ¿Qué resultado se mostrará?",
            options: [
                "La pertenencia y la asignación de red VLAN a direcciones MAC del dispositivo",
                "La asignación de red VLAN y VLAN nativa",
                "La pertenencia y la asignación de red VLAN de todos los puertos de switch",
                "El encapsulamiento de enlaces troncales y la asignación de red VLAN"
            ],
            answer: "La pertenencia y la asignación de red VLAN de todos los puertos de switch",
            explanation: "El comando show vlan brief proporcionará información que muestra la pertenencia y la asignación de red VLAN de todos los puertos de switch en un switch."
        },
        {
            number: 29,
            text: "Abra la actividad de PT. Realice las tareas en las instrucciones de la actividad y luego responda la pregunta. ¿Qué mensaje se muestra cuando se ingresa 10.10.10.1 en la barra de direcciones del navegador web PC1?",
            options: ["Servidor Cisco", "Servidor de prueba", "Servidor local", "Servidor de archivos"],
            answer: "Servidor de archivos",
            explanation: "Examinando la configuración del switch SW1 muestra que la interfaz Gi0/1 no está configurada como troncal. Ejecutar el comando de configuración de interfaz switchport mode trunk en esta interfaz permitirá las comunicaciones entre PC1 y Server1.",
            image: "img/10.jpg"
        },
        {
            number: 30,
            text: "¿Qué comando muestra información sobre la configuración de auto-MDIX para una interfaz específica?",
            options: ["show interfaces", "show running-config", "show controllers", "show processes"],
            answer: "show controllers",
            explanation: "Para examinar la configuración de la detección automática de cables cruzados (MDIX) automática para una interfaz específica, debe utilizarse el comando show controllers ethernet-controller con la palabra clave phy."
        },

        // Preguntas 31-40
        {
            number: 31,
            text: "Si un extremo de una conexión Ethernet está configurado en el modo dúplex completo y el otro extremo de la conexión está configurado en el modo semidúplex, ¿dónde se observan las colisiones tardías?",
            options: [
                "En el extremo semidúplex de la conexión",
                "En ambos extremos de la conexión",
                "Solo en las interfaces de serie",
                "En el extremo dúplex completo de la conexión"
            ],
            answer: "En el extremo semidúplex de la conexión",
            explanation: "Las comunicaciones de dúplex completo no producen colisiones. No obstante, las colisiones generalmente ocurren en operaciones semidúplex. Cuando una conexión tiene dos configuraciones dúplex diferentes, el extremo semidúplex experimentará colisiones tardías. Las colisiones se encuentran en las redes Ethernet. Las interfaces seriales usan tecnologías que no son Ethernet."
        },
        {
            number: 32,
            text: "Consulte la exhibición. Un administrador de red revisa la asignación de puertos y de VLAN en el switch S2, y advierte que no se incluyen las interfaces Gi0/1 y Gi0/2 en el resultado. ¿Por qué motivo faltarían las interfaces en el resultado?",
            options: [
                "Hay una incompatibilidad de VLAN nativa entre los switches.",
                "Están configuradas como interfaces de enlace troncal.",
                "No hay medios conectados a las interfaces.",
                "Están desactivadas administrativamente."
            ],
            answer: "Están configuradas como interfaces de enlace troncal.",
            explanation: "Las interfaces configuradas como enlaces troncales no pertenecen a una VLAN y, por lo tanto, no se muestran en el resultado de los comandos show vlan brief.",
            image: "img/11.jpg"
        },
        {
            number: 33,
            text: "Una el campo de la etiqueta de VLAN IEEE 802.1Q estándar con la descripción. (No se utilizan todas las opciones.)",
            options: [
                "Tipo: es un valor de 2 bytes denominado “ID de protocolo de etiqueta” (TPID).",
                "Prioridad de usuario: es un valor de 3 bits que admite la implementación de nivel o de servicio.",
                "Identificador de formato canónico (CFI): es un identificador de 1 bit que habilita las tramas Token Ring que se van a transportar a través de los enlaces Ethernet.",
                "ID de VLAN (VID): es un número de identificación de VLAN de 12 bits que admite hasta 4096 ID de VLAN."
            ],
            answer: [
                "Tipo: es un valor de 2 bytes denominado “ID de protocolo de etiqueta” (TPID).",
                "Prioridad de usuario: es un valor de 3 bits que admite la implementación de nivel o de servicio.",
                "Identificador de formato canónico (CFI): es un identificador de 1 bit que habilita las tramas Token Ring que se van a transportar a través de los enlaces Ethernet.",
                "ID de VLAN (VID): es un número de identificación de VLAN de 12 bits que admite hasta 4096 ID de VLAN."
            ],
            explanation: "El encabezado estándar IEEE 802.1Q incluye una etiqueta VLAN de 4 bytes: Tipo: es un valor de 2 bytes denominado “ID de protocolo de etiqueta” (TPID). Prioridad de usuario: es un valor de 3 bits que admite la implementación de nivel o de servicio. Identificador de formato canónico (CFI): es un identificador de 1 bit que habilita las tramas Token Ring que se van a transportar a través de los enlaces Ethernet. ID de VLAN (VID): es un número de identificación de VLAN de 12 bits que admite hasta 4096 ID de VLAN.",
            image: "img/12.jpg"
        },
        {
            number: 34,
            text: "¿Cuáles son los cuatro pasos necesarios para configurar una red VLAN de voz en un puerto de switch? (Elija cuatro opciones.)",
            options: [
                "Activar el árbol de expansión PortFast en la interfaz.",
                "Configurar la interfaz como un enlace troncal IEEE 802.1Q.",
                "Asignar una red VLAN de datos al puerto de switch.",
                "Asignar la red VLAN de voz al puerto de switch.",
                "Asegurar que el tráfico de voz sea confiable y que se etiqueta con un valor de prioridad CoS.",
                "Configurar la interfaz del puerto de switch con subinterfaces.",
                "Agregar una red VLAN de voz.",
                "Configurar los puertos de switch en modo de acceso."
            ],
            answer: [
                "Asignar la red VLAN de voz al puerto de switch.",
                "Asegurar que el tráfico de voz sea confiable y que se etiqueta con un valor de prioridad CoS.",
                "Agregar una red VLAN de voz.",
                "Configurar los puertos de switch en modo de acceso."
            ],
            explanation: "Para añadir un teléfono IP, se deben agregar los siguientes comandos al puerto de switch: SW3(config-vlan)# vlan 150 SW3(config-vlan)# name voice SW3(config-vlan)# int fa0/20 SW3(config-if)# switchport mode access SW3(config-if)# mls qos trust cos SW3(config-if)# switchport access vlan 150"
        },
        {
            number: 35,
            text: "Una escuela secundaria utiliza VLAN15 para la red de laboratorio y VLAN30 para la red del cuerpo docente. ¿Qué se necesita para permitir la comunicación entre estas dos VLAN mientras se utiliza el enfoque router-on-a-stick?",
            options: [
                "Se necesita un switch con un puerto configurado como enlace troncal al conectarse a un router.",
                "Se necesitan dos grupos de switches, cada uno con puertos configurados para una VLAN.",
                "Se necesita un switch de multicapa.",
                "Se necesita un router con al menos dos interfaces de la red LAN."
            ],
            answer: "Se necesita un switch con un puerto configurado como enlace troncal al conectarse a un router.",
            explanation: "Con router-on-a-stick, un router con una única interfaz de router conectada a un puerto de switch configurado con el modo troncal realiza el routing entre VLAN. Pueden configurarse múltiples subinterfaces, cada una configurada para una VLAN, en una única interfaz física del router. Los switches pueden tener puertos designados a diferentes VLAN, pero la comunicación entre dichas VLAN requiere la función de routing del router. En el enfoque router-on-a-stick para el routing entre VLAN no se usa el switch multicapa."
        },
        {
            number: 36,
            text: "Consulte la exhibición. Un administrador de red está verificando la configuración del routing entre VLAN. Los usuarios se quejan de que las computadoras de distintas VLAN no se pueden comunicar. Sobre la base del resultado, ¿cuáles de los siguientes son dos errores de configuración en la interfaz de switch Gi1/1? (Elija dos).",
            options: [
                "Gi1/1 está configurada en modo de enlace troncal.",
                "Gi1/1 se encuentra en la VLAN predeterminada.",
                "Está activada la negociación de enlaces troncales en Gi1/1.",
                "No se asignó la VLAN de voz a Gi1/1.",
                "El protocolo de encapsulación de enlaces troncales está mal configurado."
            ],
            answer: ["Gi1/1 está configurada en modo de enlace troncal.", "Gi1/1 se encuentra en la VLAN predeterminada."],
            explanation: "Con los métodos de routing entre VLAN antiguo, los puertos de switch que se conectan al router se deben configurar en modo de acceso y deben tener asignadas las VLAN adecuadas. En esta situación, la interfaz Gi1/1 debe estar en modo de acceso y debe tener asignada la VLAN 10. Las otras opciones son configuraciones predeterminadas del switch y no tienen ningún efecto en el routing entre VLAN antiguo.",
            image: "img/13.jpg"
        },
        {
            number: 37,
            text: "Consulte la ilustración. De acuerdo con el resultado del comando show running-config , se implementó una configuración de router-on-a-stick para las VLAN 15, 30 y 45. Las computadoras de la VLAN 45 que usan la red 172.16.45.0 /24 tienen problemas para conectarse a las computadoras de la VLAN 30 en la red 172.16.30.0 /24. ¿Cuál de estos errores es la causa más probable del problema?",
            options: [
                "Se configuró una VLAN incorrecta en GigabitEthernet 0/0.45.",
                "Falta una dirección IP en la interfaz GigabitEthernet 0/0.",
                "Se configuró una dirección IP incorrecta en GigabitEthernet 0/0.30.",
                "Falta el comando no shutdown en GigabitEthernet 0/0.30."
            ],
            answer: "Se configuró una dirección IP incorrecta en GigabitEthernet 0/0.30.",
            explanation: "La subinterfaz GigabitEthernet 0/0.30 tiene una dirección IP que no corresponde al esquema de direccionamiento de VLAN. La interfaz física GigabitEthernet 0/0 no necesita una dirección IP para que las subinterfaces funcionen. Las subinterfaces no requieren el comando no shutdown.",            
            image: "img/14.jpg"
        },
        {
            number: 38,
            text: "¿Cuál es el tamaño mínimo de una trama de Ethernet que el receptor no descartará como marco runt?",
            options: ["1024 bytes", "1500 bytes", "512 bytes", "64 bytes"],
            answer: "64 bytes",
            explanation: "El tamaño mínimo de una trama de Ethernet es de 64 bytes. Las tramas menores a 64 bytes se consideran fragmentos de colisión o marcos runt y se descartan."
        },
        {
            number: 39,
            text: "En un switch configurado con varias VLAN, ¿qué comando elimina solo la VLAN 100 del switch?",
            options: [
                "Switch(config-if)# no switchport access vlan 100",
                "Switch(config-if)# no switchport trunk allowed vlan 100",
                "Switch# delete flash:vlan.dat",
                "Switch(config)# no vlan 100"
            ],
            answer: "Switch(config)# no vlan 100",
            explanation: "Para eliminar todas las VLAN de un switch, se debería utilizar el comando delete flash:vlan.dat . Para cambiar la VLAN asignada para una interfaz, se utilizaría el comando no switchport access vlan 100 interface configuration . Para eliminar la VLAN 100 como una VLAN permitida en un enlace troncal, se utilizaría el comando no switchport trunk allowed vlan 100 , pero esto no eliminaría la VLAN del switch. Para eliminar una sola VLAN, como la VLAN 100, se utilizaría el comando vlan 100 global configuration ."
        },
        {
            number: 40,
            text: "Una el modo de DTP con su función. (No se utilizan todas las opciones).",
            options: [
                "El modo dinámico automático convierte la interfaz en una interfaz de enlace troncal si la interfaz vecina se establece en modo de enlace troncal o en modo deseado.",
                "El modo dinámico deseado hace que la interfaz intente convertir el enlace en un enlace troncal de forma activa.",
                "El modo de enlace troncal coloca la interfaz en modo de enlace troncal permanente y negocia para convertir el enlace vecino en un enlace troncal.",
                "El modo de no negociación evita que la interfaz genere tramas DTP."
            ],
            answer: [
                "El modo dinámico automático convierte la interfaz en una interfaz de enlace troncal si la interfaz vecina se establece en modo de enlace troncal o en modo deseado.",
                "El modo dinámico deseado hace que la interfaz intente convertir el enlace en un enlace troncal de forma activa.",
                "El modo de enlace troncal coloca la interfaz en modo de enlace troncal permanente y negocia para convertir el enlace vecino en un enlace troncal.",
                "El modo de no negociación evita que la interfaz genere tramas DTP."
            ],
            explanation: "El modo dinámico automático convierte la interfaz en una interfaz de enlace troncal si la interfaz vecina se establece en modo de enlace troncal o en modo deseado. El modo dinámico deseado hace que la interfaz intente convertir el enlace en un enlace troncal de forma activa. El modo de enlace troncal coloca la interfaz en modo de enlace troncal permanente y negocia para convertir el enlace vecino en un enlace troncal. El modo de no negociación evita que la interfaz genere tramas DTP.",
            image: "img/15.jpg"
        },
        // Preguntas 41-50
        {
            number: 41,
            text: "Consulte la ilustración. La PC1 no puede comunicarse con el servidor 1. El administrador de redes emite el comando show interfaces trunk para comenzar a resolver los problemas. ¿Qué conclusión puede sacarse conforme al resultado del comando?",
            options: [
                "El modo de DTP está establecido incorrectamente en dinámico automático en la interfaz G0/1.",
                "La interfaz G0/2 no está configurada como enlace troncal.",
                "La VLAN 20 no se ha creado.",
                "El encapsulamiento de la interfaz G0/1 es incorrecto."
            ],
            answer: "La interfaz G0/2 no está configurada como enlace troncal.",
            explanation: "En la salida show interfaces trunk , la interfaz G0/2 de DLS1 no aparece. Esto indica que la interfaz probablemente no se configuró como enlace troncal.",
            image: "img/16.jpg"
        },
        {
            number: 42,
            text: "Consulte la exhibición. ¿Cuál es la causa del error que se muestra en la configuración del routing entre VLAN en el router CiscoVille?",
            options: [
                "El comando encapsulation dot1Q 20 no se configuró.",
                "La dirección IP en CiscoVille es incorrecta.",
                "La interfaz gig0/0 no admite el routing entre VLAN.",
                "El comando no shutdown no se configuró."
            ],
            answer: "El comando encapsulation dot1Q 20 no se configuró.",
            explanation: "Los pasos para configurar el routing entre VLAN se deben ejecutar siguiendo un orden específico. Antes de configurar una dirección IP en una subinterfaz, se debe especificar el comando encapsulation dot1q VLAN_id .",
            image: "img/17.jpg"
        },
        {
            number: 43,
            text: "Consulte la exhibición. Un administrador de red está verificando la configuración del routing entre VLAN. Los usuarios se quejan de que la PC2 no puede comunicarse con la PC1. Sobre la base del resultado, ¿cuál es la posible causa del problema?",
            options: [
                "El comando interface GigabitEthernet0/0.5 se introdujo de manera incorrecta.",
                "No se introdujo el comando no shutdown en las subinterfaces.",
                "No se configuró Gi0/0 como puerto de enlace troncal.",
                "No se configuró ninguna dirección IP en la interfaz Gi0/0.",
                "El comando encapsulation dot1Q 5 contiene una VLAN incorrecta."
            ],
            answer: "El comando encapsulation dot1Q 5 contiene una VLAN incorrecta.",
            explanation: "En router-on-a-stick, la configuración de la subinterfaz debe coincidir con el número de VLAN en el comando encapsulation; en este caso, el comando encapsulation dot1Q 10 debe utilizarse para la VLAN 10. Dado que se utilizan subinterfaces, no hay necesidad de configurar la IP en la interfaz física Gi0/0. El modo de enlace troncal se configura en el puerto de switch que se conecta al router. Las subinterfaces se activan en cuanto se agregan.",
            image: "img/18.jpg"
        },
        {
            number: 44,
            text: "Consulte la exhibición. Un administrador de red configura RT1 para el routing entre VLAN. El switch se configuró correctamente y funciona. El Host1, el Host2 y el Host3 no pueden comunicarse entre sí. Sobre la base de la configuración del router, ¿cuál es la causa del problema?",
            options: [
                "Los routers no admiten la encapsulación 802.1Q en las subinterfaces.",
                "Cada subinterfaz de Fa0/0 necesita comandos no shutdown independientes.",
                "La interfaz Fa0/0 no tiene información de configuración de direcciones IP.",
                "No se asignaron correctamente las direcciones IP en las subinterfaces a las VLAN."
            ],
            answer: "No se asignaron correctamente las direcciones IP en las subinterfaces a las VLAN.",
            explanation: "Dado que Host 1 (en la VLAN 20) tiene la IP 172.18.1.10/27, la subinterfaz Fa0/0.1 debe configurarse con una dirección IP en la red 172.168.1.0/27. Del mismo modo, Fa0/0.2 debe tener una dirección IP en la red 172.168.1.64/27 y Fa0/0.3 debe tener una dirección IP en la red 172.168.1.96/27.",
            image: "img/19.jpg"
        },
        {
            number: 45,
            text: "Un técnico está configurando un nuevo switch Cisco 2960. ¿Cuál es el efecto de emitir el comando branchSW (config-if) # ip address 172.18.33.88 255.255.255.0 ?",
            options: [
                "Aplica una dirección IPv6 a la interfaz virtual.",
                "Actualiza la tabla de direcciones MAC para el puerto asociado.",
                "Permite configurar una dirección IPv6 en una interfaz física de switch.",
                "Activa una interfaz de switch virtual o física.",
                "Aplica una dirección IPv4 a la interfaz virtual."
            ],
            answer: "Aplica una dirección IPv4 a la interfaz virtual.",
            explanation: "El comando ip address se utiliza para asignar una dirección IPv4 a una interfaz virtual (SVI) en un switch de capa 3."
        },
        {
            number: 46,
            text: "Consulte la exhibición. Un switch recibe una trama de capa 2 que contiene una dirección MAC de origen 000b.a023.c501 y una dirección MAC de destino 0050.0fae.75aa. Coloque los pasos del switch en el orden en el que se producen. (No se utilizan todas las opciones).",
            options: [
                "El switch agrega la dirección MAC de origen a la tabla de direcciones MAC.",
                "El switch busca la dirección MAC de destino en la tabla de direcciones MAC.",
                "El switch reenvía la trama desde el puerto correspondiente.",
                "El switch reenvía la trama a todos los puertos, excepto a aquel por el cual llegó."
            ],
            answer: [
                "El switch agrega la dirección MAC de origen a la tabla de direcciones MAC.",
                "El switch busca la dirección MAC de destino en la tabla de direcciones MAC.",
                "El switch reenvía la trama desde el puerto correspondiente."
            ],
            explanation: "El primer paso que efectúa un switch cuando procesa una trama es ver si la dirección MAC de origen está en la tabla de direcciones MAC. Si la dirección no aparece, el switch la agrega. A continuación, el switch examina la dirección MAC de destino y la compara con la tabla de direcciones MAC. Si la dirección aparece en la tabla, el switch reenvía la trama desde el puerto correspondiente. Si la dirección no aparece en la tabla, el switch reenvía la trama a todos los puertos, excepto a aquel por el cual llegó.",
            image: "img/20.jpg",
            image: "img/21.jpg"
        },
        {
            number: 47,
            text: "Consulte la ilustración. ¿En qué modo de switch se debe asignar el puerto G0/1 si se utilizan las mejores prácticas de Cisco?",
            options: ["Automático", "Nativa", "Troncal", "Acceso"],
            answer: "Troncal",
            explanation: "El router se usa para el routing entre las dos VLAN, por lo que el puerto del switch G0/1 debe configurarse en el modo troncal.",
            image: "img/22.jpg"
        },
        {
            number: 48,
            text: "¿Qué comando se utiliza para establecer la variable de entorno BOOT que define dónde encontrar el archivo de imagen del IOS en un switch?",
            options: ["config-register", "boot system", "confreg", "boot loader"],
            answer: "boot system",
            explanation: "El comando boot system se puede utilizar para establecer la variable de entorno BOOT. Los comandos config-register y confreg se usan para establecer el registro de configuración. El comando boot loader admite comandos para formatear el sistema de archivos flash, volver a instalar el software del sistema operativo y recuperarse de la pérdida o el olvido de una contraseña."
        },
        {
            number: 49,
            text: "¿Qué tipo de VLAN admite tráfico sin etiqueta?",
            options: ["VLAN troncal", "VLAN nativa", "VLAN deseable", "VLAN de seguridad"],
            answer: "VLAN nativa",
            explanation: "La VLAN nativa se utiliza para el tráfico sin etiquetar en un enlace troncal."
        },
        {
            number: 50,
            text: "¿Cuáles dos instrucciones son correctas con respecto al enrutamiento entre VLAN de SVI? (Escoja dos opciones).",
            options: [
                "No hay necesidad de una conexión a un router.",
                "Cambiar paquetes es más rápido con SVI.",
                "Los SVIs se pueden incluir en EtherChannels.",
                "Las interfaces virtuales admiten subinterfaces.",
                "Los SVIs eliminan la necesidad de una puerta de enlace predeterminada en los hosts."
            ],
            answer: ["No hay necesidad de una conexión a un router.", "Cambiar paquetes es más rápido con SVI."],
            explanation: "El método de enrutamiento inter-VLAN de SVI es más rápido que otros métodos. El switch puede enrutar las VLAN existentes sin necesidad de un router."
        },
        {
            number: 51,
            text: "¿Qué característica del switch ayuda a mantener el tráfico local y alivia la congestión de la red?",
            options: ["Búferes para tramas grandes", "Switching interno rápido", "Alta densidad del puerto", "velocidad de puerto rápido"],
            answer: "Alta densidad del puerto",
            explanation: "Los switches que tienen muchos puertos (alta densidad de puertos) reducen el número de switches requeridos y mantienen parte del tráfico localmente en el switch, eliminando así la necesidad de enviarlo entre switches."
        },
        {
            number: 52,
            text: "¿Cuál es la diferencia significativa entre un hub y un switch LAN de capa 2?",
            options: [
                "Un concentrador reenvía tramas y un switch reenvía solo paquetes.",
                "Un hub divide los dominios de colisión y un switch divide los dominios de difusión.",
                "Cada puerto de un concentrador es un dominio de colisión, y cada puerto de un switch es un dominio de difusión.",
                "Un concentrador extiende un dominio de colisión y un switch divide los dominios de colisión."
            ],
            answer: "Un concentrador extiende un dominio de colisión y un switch divide los dominios de colisión.",
            explanation: "Los hubs operan sólo en la capa física, reenviando bits como señales de cable de todos los puertos, y extienden el dominio de colisión de una red. Los switches reenvian tramas en la capa de enlace de datos y cada puerto del switch es un dominio de colisión separado que crea más, pero más pequeños, dominios de colisión. Los switches no administran dominios de difusión porque las tramas de difusión siempre se reenvían desde todos los puertos activos."
        },
        {
            number: 53,
            text: "¿Cómo afectan los búferes de switch al rendimiento de la red?",
            options: [
                "Almacenan tramas recibidas, evitando así el descarte prematuro de tramas cuando se produce la congestión de la red.",
                "Proporcionan la comprobación de errores en los datos recibidos.",
                "Retienen los datos temporalmente cuando se produce una colisión hasta que se reanuda la transmisión normal de datos.",
                "Proporcionan memoria adicional para un puerto en particular si falla la negociación automática de velocidad o dúplex."
            ],
            answer: "Almacenan tramas recibidas, evitando así el descarte prematuro de tramas cuando se produce la congestión de la red.",
            explanation: "Los switches tienen grandes tramas de almacenamiento que permiten que los datos en espera de ser transmitidos se almacenen para que no se descarten. Esta característica es beneficiosa especialmente si el tráfico entrante proviene de un puerto más rápido que el puerto de salida utilizado para la transmisión."
        },
        {
            number: 54,
            text: "¿Qué tipo de VLAN está configurado específicamente para el tráfico de red como SSH, Telnet, HTTPS, HHTP y SNMP?",
            options: ["VLAN troncal", "VLAN de voz", "VLAN de administración", "VLAN de seguridad"],
            answer: "VLAN de administración"
        },
        {
            number: 55,
            text: "¿Qué utiliza un switch para localizar y cargar la imagen del IOS?",
            options: ["Archivo de imagen del IOS", "NVRAM", "startup-config", "Variable de entorno de BOOT", "POST"],
            answer: "Variable de entorno de BOOT",
            explanation: "La variable de entorno BOOT contiene la información sobre dónde encontrar el archivo de imagen IOS."
        },
        {
            number: 56,
            text: "¿Qué componente del switch reduce la cantidad de tiempo de manejo de paquetes dentro del switch?",
            options: ["procesadores dobles", "gran tamaño de búfer", "ASIC", "RAM de almacenamiento y reenvío"],
            answer: "ASIC",
            explanation: "Los Application-specific integrated circuits (ASIC) se utilizan en los switches Cisco para acelerar las operaciones del switch de modo que el switch pueda tener un mayor número de puertos sin degradar el rendimiento del switch."
        },
        {
            number: 57,
            text: "¿Qué tipo de VLAN es inicialmente la VLAN de administración?",
            options: ["VLAN de datos", "VLAN de administración", "VLAN nativa", "VLAN predeterminada"],
            answer: "VLAN predeterminada"
        },
        {
            number: 58,
            text: "¿Qué tipo de VLAN está diseñada para reservar ancho de banda para garantizar la calidad del teléfono IP?",
            options: ["VLAN de seguridad", "VLAN de voz", "VLAN troncal", "VLAN de administración"],
            answer: "VLAN de voz"
        },
        {
            number: 59,
            text: "Un técnico está configurando un nuevo switch Cisco 2960. ¿Cuál es el efecto de emitir el comando BranchSW# configure terminal ?",
            options: [
                "Guarda la configuración en ejecución en la NVRAM.",
                "Deshabilita una interfaz de switch virtual o física.",
                "Ingresa al modo de configuración global.",
                "Guarda la configuración que se está ejecutando en la configuración de inicio.",
                "Actualiza la tabla de direcciones MAC para el puerto asociado."
            ],
            answer: "Ingresa al modo de configuración global."
        },
        {
            number: 60,
            text: "¿Qué tipo de VLAN no debe transportar tráfico de administración de voz y red?",
            options: ["VLAN troncal", "VLAN de datos", "VLAN de seguridad", "VLAN de voz"],
            answer: "VLAN de datos"
        },
        
                // Pregunta 61
                {
                    number: 61,
                    text: "¿Qué método de conmutación garantiza que la trama entrante está libre de errores antes de reenviarla?",
                    options: ["libre de fragmentos", "FCS", "Método de corte", "Almacenamiento y envío"],
                    answer: "Almacenamiento y envío",
                    explanation: "Store-and-Forward valida la trama completa (incluyendo FCS) antes de reenviar."
                },
        
                // Pregunta 62
                {
                    number: 62,
                    text: "¿Qué tipo de VLAN se usa para separar la red en grupos de usuarios o dispositivos?",
                    options: ["VLAN de voz", "VLAN de datos", "VLAN nativa", "VLAN de administración"],
                    answer: "VLAN de datos",
                    explanation: "Segmenta usuarios por función/departamento (ej: VLAN 10 para Ventas, VLAN 20 para Finanzas)."
                },
        
                // Pregunta 63
                {
                    number: 63,
                    text: "Un técnico está configurando un nuevo switch Cisco 2960. ¿Cuál es el efecto de emitir el comando branchSW> enable?",
                    options: [
                        "Actualiza la tabla de direcciones MAC para el puerto asociado.",
                        "Permite configurar una dirección IPv6 en una interfaz física de switch.",
                        "Entra en modo privilegiado.",
                        "Entra en el modo de configuración para una interfaz virtual de switch.",
                        "Ingresa al modo de configuración global."
                    ],
                    answer: "Entra en modo privilegiado.",
                    explanation: "'enable' otorga acceso a comandos de administración (indicado por el prompt '#')."
                },
        
                // Pregunta 64
                {
                    number: 64,
                    text: "¿Qué tipo de VLAN está diseñada para tener un retraso de menos de 150 ms en toda la red?",
                    options: ["VLAN troncal", "VLAN deseable", "VLAN de voz", "VLAN de seguridad"],
                    answer: "VLAN de voz",
                    explanation: "Requisito de latencia <150ms para calidad de voz (QoS con prioridad)."
                },
        
                // Pregunta 65
                {
                    number: 65,
                    text: "Un técnico esta configurando un nuevo switch Cisco 2960 ¿Cuál es el efecto de emitir el comando branchSW(Config-if)#ipv6 address 2001:db8:a2b 4:88::1/64? Un técnico esta configurando un nuevo switch Cisco 2960 ¿Cuál es el efecto de emitir el comando branchSW(Config-if)#ipv6 address 2001:db8:a2b4:88::1/64?",
                    options: [
                        "Aplica una dirección IPv6 a la interfaz virtual.",
                        "Activa una interfaz de conmutador virtual o física.",
                        "Aplica una dirección IPv4 a la interfaz virtual.",
                        "Permite configurar una dirección IPv6 en la interfaz física de un switch.",
                        "Actualiza la tabla de direcciones MAC para el puerto asociado."
                    ],
                    answer: "Aplica una dirección IPv6 a la interfaz virtual.",
                    explanation: "Configura una SVI con IPv6 (ej: para gestión del switch)."
                },
        
                // Pregunta 66
                {
                    number: 66,
                    text: "Un técnico está configurando un nuevo switch Cisco 2960. ¿Cuál es el efecto de emitir el comando branchSW (config-if) # duplex full ?",
                    options: [
                        "Permite que los datos fluyan en una sola dirección a la vez en la interfaz",
                        "Permite que los datos fluyan en ambas direcciones al mismo tiempo en la interfaz.",
                        "Cifra las contraseñas en modo de usuario cuando los usuarios se conectan de forma remota.",
                        "Configura el switch como la puerta de enlace predeterminada.",
                        "Ajusta automáticamente el puerto para permitir que las conexiones del dispositivo utilicen un cable directo o un cable cruzado."
                    ],
                    answer: "Permite que los datos fluyan en ambas direcciones al mismo tiempo en la interfaz.",
                    explanation: "'duplex full' elimina colisiones (opuesto a 'half-duplex')."
                },
        
                // Pregunta 67
                {
                    number: 67,
                    text: " Un técnico está configurando un nuevo switch Cisco 2960. ¿Cuál es el efecto de emitir el comando branchSW (config-if) # exit?",
                    options: [
                        "Entra en modo de usuario.",
                        "Guarda la configuración que se está ejecutando en la configuración de inicio.",
                        "Configura la puerta de enlace predeterminada para el switch.",
                        "Vuelve al modo privilegiado.",
                        "Vuelve al modo de configuración global."
                    ],
                    answer: "Vuelve al modo de configuración global.",
                    explanation: "Sale del modo interfaz (config-if) al modo global (config)."
                },
        
                // Pregunta 68
                {
                    number: 68,
                    text: "Un técnico está configurando un nuevo switch Cisco 2960. ¿Cuál es el efecto de emitir el comando branchSW (config-if) # shutdown?",
                    options: [
                        "Aplica una dirección IPv4 a la interfaz virtual.",
                        "Permite configurar una dirección IPv6 en una interfaz física de switch.",
                        "Aplica una dirección IPv6 a la interfaz virtual.",
                        "Deshabilita una interfaz de switch virtual o física.",
                        "Actualiza la tabla de direcciones MAC para el puerto asociado."
                    ],
                    answer: "Deshabilita una interfaz de switch virtual o física.",
                    explanation: "'shutdown' desactiva la interfaz (estado administratively down)."
                }
            ];
         
     // Función para aleatorizar un array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
 // Función para renderizar preguntas
 const renderQuestions = (questionsToRender) => {
    questionsContainer.innerHTML = '';

    if (questionsToRender.length === 0) {
        questionsContainer.innerHTML = '<p class="no-results">No se encontraron preguntas que coincidan con tu búsqueda.</p>';
        return;
    }

    questionsToRender.forEach(question => {
        const questionEl = document.createElement('div');
        questionEl.className = 'question';
        questionEl.dataset.number = question.number;

        const optionsHtml = question.options.map((option, index) => `
            <div class="option">
                <input type="${Array.isArray(question.answer) ? 'checkbox' : 'radio'}" 
                       name="question-${question.number}" 
                       id="q${question.number}-opt${index}" 
                       value="${option}">
                <label for="q${question.number}-opt${index}">${option}</label>
            </div>
        `).join('');
        let imageHtml = '';
        if (question.image) {
            imageHtml = `<img src="${question.image}" alt="Imagen de la pregunta ${question.number}">`;
        }

        questionEl.innerHTML = `
            <div class="question-header">
                <span class="question-number">Pregunta ${question.number}</span>
                <span class="question-status hidden"></span>
            </div>
            <div class="question-text">${question.text}</div>
            ${imageHtml}
            <div class="options">${optionsHtml}</div>
            <div class="question-footer">
                <button class="show-answer" data-question="${question.number}">
                    Mostrar Respuesta
                </button>
                <div class="answer hidden" id="answer-${question.number}">
                    <div class="answer-content">
                        <strong>Respuesta:</strong> 
                        ${Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}
                    </div>
                    <div class="explanation">
                        <strong>Explicación:</strong> ${question.explanation}
                    </div>
                </div>
            </div>
        `;

        questionsContainer.appendChild(questionEl);
    });
};

// Event Delegation para manejar clics en respuestas
questionsContainer.addEventListener('click', (e) => {
    // Manejar botones de mostrar respuesta
    if (e.target.classList.contains('show-answer')) {
        const button = e.target;
        const questionNum = button.dataset.question;
        const answerEl = document.getElementById(`answer-${questionNum}`);

        answerEl.classList.toggle('hidden');
        button.textContent = answerEl.classList.contains('hidden')
            ? 'Mostrar Respuesta'
            : 'Ocultar Respuesta';
    }


        // Manejar selección de opciones
        if (e.target.tagName === 'INPUT') {
            const questionEl = e.target.closest('.question');
            const questionNum = questionEl.dataset.number;
            const question = questions.find(q => q.number === parseInt(questionNum));

            // Lógica de validación (ya la tenías)
            let isCorrect;
            if (Array.isArray(question.answer)) {
                const selectedOptions = Array.from(questionEl.querySelectorAll('input:checked')).map(input => input.value);
                isCorrect = selectedOptions.length === question.answer.length && selectedOptions.every(option => question.answer.includes(option));
            } else {
                const selectedOption = e.target.value;
                isCorrect = selectedOption === question.answer;
            }

            // Mostrar retroalimentación (Correcto/Incorrecto)
            const statusEl = questionEl.querySelector('.question-status');
            statusEl.textContent = isCorrect ? 'Correcto' : 'Incorrecto';
            statusEl.classList.remove('hidden');

            // Mostrar la explicación
            const answerEl = document.getElementById(`answer-${questionNum}`);
            console.log('Elemento answer:', answerEl); // Verifica el elemento
            if (answerEl) {
                console.log('Mostrando explicación'); // Verifica si se ejecuta esta línea
                console.log('Contenido de answer-content:', answerEl.querySelector('.answer-content').textContent); // Verifica el contenido
                console.log('Contenido de explanation:', answerEl.querySelector('.explanation').textContent); // Verifica el contenido

                answerEl.classList.remove('hidden');
                questionEl.querySelector('.show-answer').textContent = 'Ocultar Respuesta';

                // Intenta forzar una actualización del DOM
                setTimeout(() => {
                    answerEl.style.display = 'block'; // Asegura que se muestre
                }, 100);
            } else {
                console.log('Elemento answer no encontrado'); // Verifica si se ejecuta esta línea
            }
        }
    });


// Función de búsqueda
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    const filteredQuestions = searchTerm
        ? questions.filter(question =>
            question.text.toLowerCase().includes(searchTerm) ||
            (question.explanation || '').toLowerCase().includes(searchTerm) || // Corrección aquí
            question.options.some(opt => opt.toLowerCase().includes(searchTerm)) ||
            question.number.toString().includes(searchTerm)
        )
        : questions;

    renderQuestions(filteredQuestions);
});

// Control para mostrar/ocultar todas las respuestas
toggleAnswersBtn.addEventListener('click', function() {
    const allAnswers = document.querySelectorAll('.answer');
    const isHidden = allAnswers.length > 0
        ? allAnswers[0].classList.contains('hidden')
        : true;

    allAnswers.forEach(answer => answer.classList.toggle('hidden', !isHidden));

    document.querySelectorAll('.show-answer').forEach(button => {
        button.textContent = isHidden ? 'Ocultar Respuesta' : 'Mostrar Respuesta';
    });

    this.textContent = isHidden ? 'Ocultar Todas las Respuestas' : 'Mostrar Todas las Respuestas';
});
// Inicialización: Aleatorizar las preguntas antes de renderizarlas
const shuffledQuestions = shuffleArray([...questions]);
renderQuestions(shuffledQuestions);
// Inicialización

});
