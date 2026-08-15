import { IconChat, IconRoute, IconSearch, IconSend, IconSparkle } from './icons';
import { useReveal } from './useReveal';

const PROMPTS = [
  'Where is the Computer Department?',
  'How do I reach the library?',
  'Find the nearest canteen',
  'Show me the route to the auditorium',
];

interface AssistantSectionProps {
  onLaunchMap: () => void;
}

export function AssistantSection({ onLaunchMap }: AssistantSectionProps) {
  const { ref, isVisible } = useReveal();

  return (
    <section className="lp-section" id="assistant">
      <div ref={ref} className={`lp-container lp-assistant-grid lp-reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="lp-assistant-copy">
          <span className="lp-eyebrow">
            <IconSparkle size={14} />
            DISHAA AI Assistant
          </span>
          <h2 className="lp-section-title">Ask DISHAA anything about your campus</h2>
          <p className="lp-section-desc">
            Your intelligent campus companion understands natural questions and points you to the
            right place. Ask about departments, facilities or routes and get instant, friendly
            answers.
          </p>

          <div className="lp-prompt-list">
            {PROMPTS.map((prompt) => (
              <button key={prompt} type="button" className="lp-prompt" onClick={onLaunchMap}>
                <IconSearch size={15} />
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="lp-chat" aria-label="DISHAA assistant preview">
          <div className="lp-chat-head">
            <span className="lp-chat-avatar"><IconChat size={20} /></span>
            <div>
              <b>DISHAA Assistant</b>
              <span><i className="lp-chat-dot" aria-hidden="true" /> Online</span>
            </div>
          </div>

          <div className="lp-chat-body">
            <p className="lp-msg lp-msg-user">How do I reach the Computer Department?</p>
            <div className="lp-msg lp-msg-bot">
              The Computer Department is on the first floor of Block B. Head straight from the Main
              Gate and take the second entrance on your right.
              <span className="lp-msg-route">
                <IconRoute size={15} />
                Route ready &middot; 320 m &middot; about 4 min
              </span>
            </div>
            <p className="lp-msg lp-msg-user">Find the nearest canteen</p>
            <div className="lp-msg lp-msg-bot">
              The nearest canteen is the Food Court, roughly 90 m from where you are now.
            </div>
          </div>

          <form className="lp-chat-input" onSubmit={(event) => { event.preventDefault(); onLaunchMap(); }}>
            <input type="text" placeholder="Ask about any place on campus..." aria-label="Ask the DISHAA assistant" />
            <button type="submit" className="lp-chat-send" aria-label="Send message">
              <IconSend size={19} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
