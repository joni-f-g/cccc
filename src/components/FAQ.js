import React from 'react';
const FAQ = ({lang}) => (
  <>
    {lang.code === 'en-US' && (
      <>
        <h4>What is the Covid Childcare Co-op Creator?</h4>

        <p>
          The CCCC is a simple tool that allows groups of parents and other
          caregivers to automatically generate a fairly distributed cooperative
          childcare schedule given each adult's availability. With schools
          shutting down indefinitely and extending few or no resources to
          caregivers, childcare co-ops balance resource constraints ($$$ and
          time) with the need to limit our gatherings.
        </p>

        <h4>What's a childcare co-op?</h4>

        <p>
          It's when caregivers agree to share the burden of watching a kid or
          kids. Instead of (say) five parents watching one kid each every day of
          the week, each of them watches five kids on one day of the week. Or
          (say) three families agree to trade off watching one kid for the month
          because the kid's primary caregiver can't get time off. Co-ops can get
          way more complex than that (up to and including full schools), but
          we're designing for the simplest, smallest versions (for obvious
          reasons).
        </p>

        <h4>How do I use the CCCC?</h4>

        <p>
          <strong>First</strong>, find the other caregivers you're going to work
          with. This is not a social network. <strong>Second</strong>, fill out
          the calendar with the days when each provider is not available. (Share
          a schedule in process with the "Shareable Link" button).{' '}
          <strong>Third</strong>, once everyone's availability is entered,
          create your schedule by pressing the "Create Schedule" button.{' '}
          <strong>Fourth</strong>, modify your schedule however you see fit.
          Look out for any gap days when no one has said they're available!{' '}
          <strong>Fifth</strong>, share your schedule with the rest of the
          co-op, using the shareable link or download a copy with the "Download
          Schedule" button.
        </p>

        <h4>So I mark when I'm not available?</h4>

        <p>Yes, mark when you're not available.</p>

        <h4>
          One of my co-op members is a nurse and they have to work M-F, how can
          we include them in the CCCC schedule?
        </h4>

        <p>
          Perhaps the biggest problem with school shutdowns as an epidemic
          response is that they leave some critical health care workers stuck at
          home looking after children when they're desperately needed at their
          jobs. The point of the CCCC is to share the hosting burden fairly
          according to people's availability, but you don't need to be on the
          schedule to be part of the co-op. If a co-op member has no
          availability, they don't need to fill out the calendar. Think of it as
          a hosting schedule and make sure they get a copy. The CCCC's
          operational principle is "from each according to their availability,
          to each according to their needs."
        </p>

        <h4>What if there's a day when no one is available?</h4>

        <p>
          You'll have to solve that one among yourselves, but the scheduler will
          alert you to when those days are.
        </p>

        <h4>Why is it limited to seven families?</h4>

        <p>
          Based on the guidance we've all received regarding group gatherings,
          if you have eight families (and can manage it) you're probably better
          off splitting into two groups of four. Really you should be keeping
          the groups as small as possible, but we recognize that there's a range
          of what's possible out there.
        </p>

        <h4>What do you do with our data? What's the privacy policy?</h4>

        <p>
          The CCCC doesn't store any of your data, so you don't have to worry
          about us running an experiment on you or selling your info to
          educational websites or anything like that. The only place your CCCC
          data lives is the shareable url that you send within your co-op. (Yes,
          it's in the url!) That way you can share your information easily, but
          no one else has it, not even us.
        </p>

        <h4>
          Why can't I link my Google calendar? Can't I do this with Google?
        </h4>

        <p>
          Yes! And if you want to, you totally should, or whatever other online
          service you want to use. The CCCC is a simple, dedicated tool designed
          to prompt caregivers to think about collective childcare and reduce
          the barriers to entry. It is not a new killer app or a digital
          communications company. If you want to find tools with more features
          to plan your co-op, they're easy to track down. We'll count that as a
          win.
        </p>

        <h4>
          Can we modify our schedule if we want to? Switch or substitute days?
        </h4>

        <p>
          Yes! CCCC is not an oracle, it just tries to generate a fairly
          distributed four weeks. You should feel more than free to change the
          result with your group however you'd like. Once the schedule is
          generated, you can switch colors the same way you did in the first
          step before you share it. Then you can download or share it like
          normal.
        </p>

        <h4>Is this legal?</h4>

        <p>
          If you're concerned with state licensing requirements, we encourage
          you to{' '}
          <a href="https://www.co-oplaw.org/co-op-basics/types/childcare-cooperatives/">
            check out this page
          </a>{' '}
          from the Sustainable Economies Law Center which lays out the situation
          and offers some guidance. Their short answer is not to worry about it
          too much if you're not planning something commercial.
        </p>

        <h4>
          Wouldn't joining a co-op increase my exposure, relative to staying
          home alone with my kids?
        </h4>

        <p>
          That's tough, because on some level the answer is obviously yes: The
          fewer interactions you can manage, the better your chances of avoiding
          the virus. But we know that not every caregiver is available to
          supervise every day, and that school shutdowns present a severe
          hardship for some families. Small co-ops maintain compliance with the
          directives to avoid gatherings while still treating childcare as a
          collective responsibility, which as a society we cannot afford to give
          up on as soon as things get tough. Accepting a little more
          risk/hardship to make sure the costs don't land on just a few families
          is what living together is all about. And in the medium term, making
          sure our health system (and other essential systems like trash and
          fire) is at full capacity is an important part of handling the
          infection curve, and to do that we need collective childcare options.
        </p>

        <p>
          None of this is a substitute for the latest medical advice, and{' '}
          <u>please don't care for other people's kids if you're sick!</u>
        </p>

        <h4>Where can I learn more about childcare cooperatives?</h4>

        <p>
          The book Bringing Families Together: A Guide to Parent Cooperatives by
          E. Kim Coontz (prepared for the University of California Center for
          Cooperatives) is the most comprehensive resource, and it's available
          as a free pdf in four parts:{' '}
          <a href="http://cccd.coop/bringing-families-together-part-i">
            Part 1
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-ii">
            Part 2
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-iii">
            Part 3
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-iv">
            Part 4
          </a>.
        </p>
      </>
    )}
    {lang.code === 'es' && (
      <>
        <h4>Preguntas Frecuentes</h4>

        <h4>Que es la Covid Calculadora Cooperativa de Cuidado (CCCC)</h4>
        <p>
          La CCCC es una herramienta simple que permite grupos de padres y otros
          cuidadores generar de manera automática un horario de cuidado infantil
          distribuido justamente y basado en la disponibilidad de los adultos.
          Con el cierre indefinida de las escuelas y la falta de recursos para
          cuidadoras, un cooperativo de cuidado/guardería harmoniza la falta de
          recursos (dinero y tiempo) con la necesidad de limitar nuestras
          reuniones.
        </p>

        <h4>Que es un cooperativa de cuidado?</h4>
        <p>
          Es cuando cuidadores coinciden en compartir el peso de cuidar un/a
          niño/a o unos/as niños/as. En vez de (por ejemplo) cinco padres
          cuidando un/a niño/a cada día de la semana, cada padre/individual
          cuida cinco niños un día de la semana. O (por ejemplo) tres familias
          coinciden en cuidar por un niño en turno por un mes por porque la
          cuidadora principal no puede tomarse días libres. Cooperativas pueden
          ser mucho más complejo que esto (incluir escuelas), pero hemos hecho
          esto para la versión más simple y pequeña (por razones obvias).
        </p>

        <h4>Como puedo usar la CCCC?</h4>
        <p>
          Primero, encuentra otros cuidadores con quien va a trabajar. Puede ser
          de su comunidad, escuela, trabajo, etc. Hay espacio por un máximo de 7
          familias en cada cooperativa. Segundo, llenar el calendario con los
          días cuando cada cuidador no está disponible. Comparte el calendario
          con las otras familias. Tercero, cuando cada familia/cuidador ha
          puesto su disponibilidad crea un horario con el botón “Crear horario.”
          Cuarto cambiar su horario como sea necesario, busca por cualquier día
          cuando nadie ha dicho que está disponible! Quinto compartes su horario
          con lo de más en la cooperativa usando el enlace generado o descargar
          una copia con el botón de “descarga horario”
        </p>
        <p>[Más información el la sección de instrucciones]</p>

        <h4>Entonces, marco cuando no estoy disponible?</h4>
        <p>Si, marca cuando no está disponible</p>

        <h4>
          Un miembro de mi cooperativa es una enfermera y ella trabaja de lunes
          a viernes, cómo podemos incluir a ella en el horario de la CCCC?
        </h4>
        <p>
          Quizás el problema más serio con el cierre de las escuelas como parte
          de la respuesta a una epidemia es que algunos trabajadores de salud
          tienen que quedar en casa para cuidar los niños cuando se necesita su
          mano de obra en el trabajo. El propósito de la CCCC es compartir
          justamente el trabajo de cuidar para los hijos, basado en la
          disponibilidad, pero no es necesario ser presente en el horario para
          participar en la cooperativa. Piensa en lo como horario de anfitrión y
          asegura que ella recibe una copia. La principal operativa de la CCCC
          es “de cada cual según su capacidades, a cada cual según sus
          necesidades.”
        </p>

        <h4>Qué pasa si hay un día cuando nadie está disponible?</h4>
        <p>
          Tienen que resolver esto entre ustedes mismos, pero el herramienta les
          alerta cuando hay uno de estos días.
        </p>

        <h4>Por que hay un límite de 7 familias?</h4>
        <p>
          Basado en la información hemos recibido sobre los reuniones en grupo,
          si tienes ocho familias (y lo puede acomodarlo), sería mejor hacer dos
          grupos de cuatro. Debemos mantener los grupos lo más chiquito que sea
          posible, pero sabemos que todos tenemos distintos capacidades.
        </p>

        <h4>Que hace con nuestros datos? Que es la política de privacidad?</h4>
        <p>
          La CCCC no guarda ningún dato personal, no tiene que preocupar que
          vamos a hacer experimentaciones con su datos ni venderlo a un sitio de
          web ni nada. El único lugar donde se queda su información está en la
          enlace de compartir que manda dentro de la cooperativa (sí! está en el
          URL!) De esta manera puede compartir fácilmente su información pero
          nadie más lo tiene, incluso nosotros.
        </p>

        <h4>
          Porque no puedo conectarla a mi Google Calendar? No lo puedo hacer con
          Google?
        </h4>
        <p>
          Si! Y si lo quiere lo debe hacer, o cualquier otro servicio en línea
          que quiere usar. La CCCC es un herramienta fácil, dedicado y designada
          para ayudar a las y los cuidadores a pensar en la guardería colectiva
          y desmantelar las barreras a la participación. No es un nuevo app ni
          empresa de comunicaciones digitales. Si quiere encontrar herramientas
          con más características para planear la cooperativa, son fácil de
          encontrar. Pensamos en esto como una victoria.
        </p>

        <h4>
          Es posible modificar nuestro horario si queremos hacerlo? Cambiar o
          sustituir días?
        </h4>
        <p>
          Sí! La CCCC no es un oráculo, simplement intenta generar un horario
          justo por cuatro semanas. Debe sentir libre a cambiar como quieres los
          resultados con su grupo. Cuando el horario ha sido generado, puedes
          cambiar los colores en la misma manera que lo hizo en el primer paso
          antes de compartirlo. Después lo puedes descargar y compartirlo de la
          misma manera.
        </p>

        <h4>Esto es legal?</h4>
        <p>
          Si está preocupado por los requisitos estatales de licencia, busca a
          este página de la Sustainable Economies Law Center que explica la
          situación y ofrece sugerencias y una guía. La respuesta corta es no
          preocupar mucho si no intenta crear un establecimiento comercial.
        </p>

        <h4>
          Pertenecer a una cooperativa no puede incrementar mi exposición, en
          comparación con quedarme en casa solo con mis niños?
        </h4>
        <p>
          Es difícil porque la respuesta por algún nivel, obviamente es sí:
          menos interacciones mejor probabilidad de evadir el virus. Pero
          sabemos que cada cuidadora no está disponible para supervisar cada
          día, y que el cierre de las escuelas causa dificultades para algunas
          familias. Cooperativas pequeñas obedecen las directivas para evadir
          reuniones mientras tratado el cuido de los niños como una
          responsabilidad colectiva--como sociedad no podemos darse por vencido
          cuando las cosas son difíciles. Esto implica aceptando un poco más
          riesgo / dificuldades para asegurar que el peso no cae solamente en
          algunos familias. En el tiempo medio, asegurar que nuestro sistema de
          salud (y otros servicios claves como la basura y bomberos) están en su
          capacidad máximo es un parte importante de abordar la curva de
          infección, para hacerlo necesitamos opciones colectivos para cuidar
          los y las hijos y hijas.
        </p>

        <p>
          Nada de esto es un sustituto para consejas médicas, por favor no cuida
          los hijos de los otros si está enferma!
        </p>

        <h4>
          Donde puedo aprender más sobre las cooperativas de cuido infantil?
        </h4>
        <p>
          El libro en íngles Bringing Families Together: A Guide to Parent
          Cooperatives by E. Kim Coontz (prepared for the University of
          California Center for Cooperatives) es lo más comprehensivo:{' '}
          <a href="http://cccd.coop/bringing-families-together-part-i">
            Part 1
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-ii">
            Part 2
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-iii">
            Part 3
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-iv">
            Part 4
          </a>. Buscamos más recursos en español pronto!
        </p>
      </>
    )}
    {lang.code === 'zh-CN' && (
      <>
        <h4>常见问题答疑</h4>

        <h4>问：什么是协作托儿日程生成器（CCCC）？</h4>

        <p>
          答：这是一个简单的工具，帮助家长和其他看护者组成的协作小组，根据各位成年人不同的时间精力，自动生成一个公平分配的协作托儿日程表。在学校无限期关闭，看护者几乎或完全无法获得支持的情况下，协作托儿试图在有限的资源、金钱、时间与减少集会的需求之间取得平衡。
        </p>

        <h4>问：什么是协作托儿？</h4>

        <p>
          答：家长和其他看护者分担看护一个或多个孩子的工作。譬如在一周五天中，相比起五位家长每天在家分别看护一个孩子，不如让每位家长每周一天在家看护五个孩子。或者说，三个家庭同意在一个月中共同分担看护一个孩子的责任，因为这个孩子的主要监护人无法休假在家。当然协作的方式可以复杂得多，甚至覆盖整个学校的孩子。出于明显的原因，我们设计的日程生成器是为了最简单和小规模的协作。
        </p>

        <h4>问：如何使用协作托儿日程生成器？</h4>

        <p>
          答：首先，找到您愿意一起协作的家长和看护者。这个生成器没有社交网络的功能。其二，每位看护者在日程表上填写出他/她无法承担托管工作的日期，在这一过程中使用分享链接的方式协作。其三，当每个人填写日程后，使用“创建日程”按钮生成一份日程总表。其四，依照需求修改日程表，尤其需要注意的是所有人都无法承担托管工作的日期。其五，使用分享链接，或“下载日程”按钮，将日程表分享给协作小组中的其他人。
        </p>

        <h4>问：所以我应该标出无法承担托管工作的日期？</h4>

        <p>答：没错，标出您没有空闲时间的日期。</p>

        <h4>
          问：我的协作小组中有人是护士，必须每周五天工作。我们如何将他/她纳入协作日程？
        </h4>

        <p>
          答：作为一种流行病应对措施，学校停课的最大问题可能是导致一些重要的医护人员在急需工作的时候不得不留在家里照顾孩子。
          协作托儿日程生成器的目的是根据人们的时间精力合理分担托儿工作，但是协作成员不需要都在这份日程表上。如果某位成员没有时间，您可将这份日程视为一个儿童托管计划，并确保这些成员拥有这份日程。它的的运作原则是各尽所能、各取所需。
        </p>

        <h4>问：如果有些时候没人能承担看护工作怎么办？</h4>

        <p>答：您需要在小组中自行协调。生成器会提醒您这些日期。</p>

        <h4>问：为什么参与的家庭上限是七个？</h4>

        <p>
          答：根据我们获得的关于聚众集会的建议，如果有八个家庭愿意参与，或许更好的方式是分为两个小组，四个家庭一组。这些协作小组应当越小越好，但我们也同样意识到实际操作中需要一定范围和灵活度。
        </p>

        <h4>问：我们的数据怎么办？你们的保密协议是什么？</h4>

        <p>
          答：我们不存储您的任何数据，您无需担心我们将您的数据用作实验或销售给教育类网站。您在CCCC中输入的数据仅存在与您与协作小组内部的分享链接中。没错，仅仅是这个链接，在便于您与他人分享信息的同时，确保包括我们在内的任何人都无法获得您的数据。
        </p>

        <h4>问：我为什么不能用谷歌日历？</h4>

        <p>
          答：当然可以，如果您愿意的话，您可以使用任何其它网络服务。CCCC是一个简单的工具，其目的是帮助家长和看护者思考如何共同托儿，并降低启动门槛。它不是一个新的热门app，也不是数字通讯公司。如果您需要功能更多的工具安排协作，网络上同样有许多容易找到的资源，这对我们而言也是双赢。
        </p>

        <h4>问：这合法吗？</h4>

        <p>
          答：如果您对获得所在州许可有所疑问，请参照可持续经济法律中心（Sustainable
          Economies Law Center）的<a href="https://www.co-oplaw.org/co-op-basics/types/childcare-cooperatives/">
            页面
          </a>（仅有英语及西班牙语），其中提供了一些情况和指导。简而言之，如果协作不涉及商业行为，则不需要太担心。
        </p>

        <h4>问：比起和孩子呆在家里，加入协作社难道不会提高我的暴露风险吗？</h4>

        <p>
          答：这个问题很难回答。在某种程度上来说，答案显而易见是肯定的。您与别人的接触越少，避免染病的几率就越大。但是我们同样知道，并不是每位家长或看护人都可以每天照顾孩子，学校停课也对许多家庭造成了严重的困难。小型协作组织在遵守公共指示、避免聚会的同时，仍将儿童保育工作视为集体的共同责任。作为一个社会，当情况变得艰难时，我们不能轻易放弃这一点。共同生存，意味着我们需要承担多一点的风险或困难，以确保负担和代价不会只落在少数家庭身上。从中期来看，确保卫生系统（以及环卫和火险等其它基本系统）能够满负荷运转，是控制感染曲线的重要一环。为此，我们需要共同承担托儿和照管的工作。
        </p>

        <p>
          当然，这些都不能替代最新的医疗卫生建议。如果您生病了，请不要照顾别人的孩子！
        </p>

        <h4>问：我可以在哪里获得更多关于协作托儿的信息？</h4>

        <p>
          答：由加州大学合作社研究中心出版、E. Kim
          Coontz撰写的《将家庭聚在一起：父母协作社指南》提供了最全面的资源。此书分成四个部分，可点击以下链接分别下载pdf：
          <a href="http://cccd.coop/bringing-families-together-part-i">
            Part 1
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-ii">
            Part 2
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-iii">
            Part 3
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-iv">
            Part 4
          </a>. （仅有英语）。
        </p>
      </>
    )}
    {lang.code === 'pt' && (
      <>
        <h4>Perguntas frequentes</h4>

        <h4>O que é o Covid Childcare Co-op Creator?</h4>

        <p>
          O CCCC é uma ferramenta simples que gera de forma automática um
          horário cooperativo para o cuidado infantil, facilitando assim a
          organização dos pais e de outros/as cuidadores/as. O horário é
          distribuído de forma justa consoante a disponibilidade de cada adulto.
          Com as escolas a fechar indefinidamente e com estas a estender poucos
          e em alguns casos nenhuns recursos a profissionais dos cuidados
          infantis, programas cooperativos como este equilibram o
          constrangimento de recursos (dinheiro e tempo) com a necessidade de
          evitar os ajuntamentos.
        </p>

        <h4>O que é um co-op de cuidados infantis?</h4>

        <p>
          É quando as famílias/cuidadores partilham a responsabilidade de cuidar
          de uma ou várias crianças. Em vez de (por exemplo) cinco pais cuidarem
          cada um/a de uma criança todos os dias da semana, cada um/a deles/as
          cuida de cinco crianças um dia por semana. Ou (por exemplo) três
          famílias concordam cuidar de uma criança cada mês porque o/a
          cuidador/a dessa criança não pode deixar de trabalhar. Um co-op
          consegue ser muito mais complexo que isso (até existem para escolas
          inteiras), mas estamos a pensar nas opções mais simples e pequenas,
          por razões óbvias.
        </p>

        <h4>Como usar o CCCC?</h4>

        <p>
          Primeiro, encontre os/as outros/as cuidadores/as com quem quer
          trabalhar. Isto não é uma rede social. Em seguida, preencha o
          calendário com os dias em que cada pessoa não está disponível
          (Partilhe um horário com o botão “Link partilhável”). Quando a
          disponibilidade de todos já estiver inserida no sistema, conclua o seu
          horário ao clicar em “Criar horário.” De seguida, modifique o horário
          como quiser. Cuidado com as datas que ninguém tenha assinalado como
          disponíveis! Para finalizar, partilhe o seu horário com o resto do seu
          co-op usando o link partilhável ou faça download de uma cópia com o
          botão “Fazer download do horário.”
        </p>

        <h4>Então assinalo quando não estou disponível?</h4>

        <p>Sim, assinale quando não está disponível.</p>

        <h4>
          Um dos participantes do meu co-op é um/a enfermeiro/a e tem que
          trabalhar de segunda a sexta. Como o/a poderemos incluir no horário do
          CCCC?
        </h4>

        <p>
          Talvez o maior problema do encerramento das escolas enquanto resposta
          à epidemia seja o facto de que alguns profissionais de saúde têm que
          ficar em casa a cuidar dos filhos apesar de ser importante que estes
          compareçam nos seus trabalhos. A ideia do CCCC é partilhar a carga do
          cuidado infantil justamente consoante a disponibilidade de cada um/a,
          mas uma pessoa não tem que estar no horário para fazer parte do co-op.
          Se um/a participante do co-op não tiver disponibilidade, não tem de
          inserir nada no calendário. Pense nisso como um horário de apoio e
          certifique que essa pessoa receba uma cópia. O princípio operacional
          do CCCC é “de cada um conforme a sua disponibilidade, para cada um
          consoante as suas necessidades.”
        </p>

        <h4>
          O que é que acontece se houver um dia em que ninguém esteja
          disponível?
        </h4>

        <p>
          Terão de resolver isso entre si, mas o programa irá alertar quando
          ocorrerem tais casos.
        </p>

        <h4>Porque é que há um limite de sete famílias?</h4>

        <p>
          Segundo as orientações que recebemos sobre ajuntamentos, caso hajam
          oito famílias (e conseguirem organizar-se) no co-op, será melhor
          dividí-las em dois grupos de quatro. Idealmente os grupos serão de
          menor número possível, mas reconhecemos que tal possa ser
          constrangedor.
        </p>

        <h4>
          O que é que faz com os nossos dados? Qual é a política de privacidade?
        </h4>

        <p>
          O CCCC não armazena nenhum dos seus dados, portanto não tem que se
          preocupar com a ideia de nós os utilizarmos indevidamente ou vendê-los
          a sites educacionais ou coisas do gênero. O único sítio onde ficam os
          seus dados é no URL partilhável que manda para o seu co-op (Sim, está
          dentro do URL). Dessa forma consegue partilhar as suas informações
          facilmente, mas ninguém tem acesso a estas, nem mesmo nós.
        </p>

        <h4>
          Porque é que não consigo ligar ao Google Calendar? Não posso fazer
          isso com o Google?
        </h4>

        <p>
          Sim! Se quiser, pode ligar o calendário ou ao Google ou a qualquer
          outra plataforma que preferir usar. O CCCC é uma ferramenta simples
          desenhada para ajudar as famílias a pensar nos cuidados infantis
          cooperativos e a facilitar a entrada neste sistema. Não é uma app
          dedicada ao consumidor nem uma empresa de comunicações. Se quiser
          procurar ferramentas com mais opções para organizar o seu co-op, são
          fáceis de encontrar. Isso também será uma vitória para nós.
        </p>

        <h4>
          Podemos modificar o nosso horário se quisermos? É possível mudar ou
          substituir dias?
        </h4>

        <p>
          Sim! O CCCC não é um oráculo, apenas tenta gerar quatro semanas
          distribuídas justamente entre as famílias. Deve sentir-se
          perfeitamente à vontade para alterar o horário do seu grupo da forma
          que achar melhor. Quando o horário estiver feito, pode mudar as cores
          da mesma forma que fez no primeiro passo antes de o partilhar. A
          seguir pode fazer download ou partilhá-lo normalmente.
        </p>

        <h4>Isto é legal?</h4>

        <p>
          Se estiver preocupado com as licenças ou requisitos do seu estado,
          aconselhamos que dê uma olhada{' '}
          <a href="https://www.co-oplaw.org/co-op-basics/types/childcare-cooperatives/">
            nesta página
          </a>{' '}
          do Sustainable Economies Law Center, que explica toda a situação e
          oferece algumas orientações. A conclusão deles é que não temos que nos
          preocupar com este tipo de programa, tratando de algo não-comercial.
        </p>

        <h4>
          Participar num co-op não aumenta as chances de me expor ao vírus mais
          do que se ficasse em casa com as crianças?
        </h4>

        <p>
          Isso é difícil, porque de certa forma a resposta é obviamente sim: a
          quanto menos interações sociais tiver exposto, maiores são as suas
          chances de evitar o vírus. Mas sabemos que nem todos os profissionais
          dos cuidados infantis estão disponíveis para trabalhar todos os dias,
          e que o encerramento das escolas apresenta dificuldades severas para
          algumas famílias. Se o sistema co-op funcionar com grupos pequenos,
          respeita as diretrizes de forma a evitar ajuntamentos. Além disso,
          trata os cuidados infantis como uma responsabilidade coletiva, da qual
          nós, enquanto sociedade, não nos podemos dar ao luxo de ignorar quando
          as coisas se tornam difíceis. Aceitar um pouco mais de
          risco/dificuldade para garantir que os custos não caiam em cima de
          algumas famílias é o se chama viver juntos. E, a médio prazo, para
          achatar a curva de infecção, é essencial garantir que o nosso sistema
          de saúde (e outros sistemas essenciais como os bombeiros e o sistema
          de recolha do lixo) esteja a funcionar no seu potencial máximo e, para
          isso, precisamos de opções coletivas de cuidados infantis.
        </p>

        <p>
          Nada disto substitui os conselhos médicos mais recentes. Por favor,{' '}
          <u>não cuide dos filhos dos outros se estiver doente</u>!
        </p>

        <h4>
          Onde posso aprender mais sobre cooperativas e cuidados infantis?
        </h4>

        <p>
          O livro Bringing Families Together: A Guide to Parent Cooperatives de
          E. Kim Coontz (preparado para a University of California Center for
          Cooperatives) é o recurso mais compreensivo, e está disponível como
          pdf grátis (em inglês) em quatro partes:{' '}
          <a href="http://cccd.coop/bringing-families-together-part-i">
            Part 1
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-ii">
            Part 2
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-iii">
            Part 3
          </a>;{' '}
          <a href="http://cccd.coop/bringing-families-together-part-iv">
            Part 4
          </a>.
        </p>
      </>
    )}
  </>
);

export default FAQ;
