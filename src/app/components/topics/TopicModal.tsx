interface ItemInterface {
  name: string;
  description: string;
  icon: string;
}

interface TopicContentInterface {
  subtitle: string;
  items: ItemInterface[];
}

export interface TopicsInterface {
  title: string;
  content: TopicContentInterface[];
}

interface TopicModalProps {
  topic: TopicsInterface;
}

export default function TopicModal({ topic }: TopicModalProps) {
  return (
    <div className=" grid-cols-1 md:grid-cols-3 xl:grid-cols-4 inline-flex gap-8 p-6 mx-auto rounded-lg shadow-xl z-50 bg-[var(--color-background)]">
      {topic.content.map((section, sectionIdx) => (
        <div key={sectionIdx} className={`min-w-2xs w-fit ${sectionIdx !== 0 ? 'border-l border-[var(--color-foreground)]/20 pl-6' : ''}`}>
          <h4 className="text-lg font-semibold mb-3">{section.subtitle}</h4>
          <ul className={`space-y-3 max-h-[400px] overflow-y-auto ${section.items.length > 5 ? 'columns-2 w-md' : ''}`}>
            {section.items.map((item, itemIdx) => (
              <li key={itemIdx} className="flex break-inside-avoid items-start gap-3 p-2 rounded transition cursor-pointer">
                <div className="text-xl align-middle">{item.icon}</div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-[var(--color-foreground)]/70">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
