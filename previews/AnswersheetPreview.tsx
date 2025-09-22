import React, { useRef } from "react";
import { AnswersheetRenderer, AnswersheetRendererRef } from "../components/AnswersheetRenderer";
import { Button } from "../components/Button";
export default function AnswersheetPreview() {
    const ref = useRef<AnswersheetRendererRef>(null);
    const yourMarkdown = `# Liquid Glass Component SEO Answersheet
[id=section1 type=section topic=liquid-glass-ui]

## Question 1
[id=q1 type=mc mode=single keyword=React]
Which library is essential for building Liquid Glass UI components in React?
- [ ] Vue.js
- [ ] Angular
- [x] React
- [ ] Svelte

## Question 2
[id=q2 type=text keyword=Glassmorphism]
Describe how glassmorphism enhances the user experience in modern UI design.

## Question 3
[id=q3 type=mc mode=multiple keyword=liquid-glass]
Which of the following are features of Liquid Glass UI components?
- [x] Glassmorphism effect
- [x] Tailwind CSS support
- [ ] jQuery dependency
- [x] Accessibility

[id=section2 type=section topic=SEO]

## Question 4
[id=q4 type=text keyword=SEO]
How can using Liquid Glass UI components improve SEO for your web application?
`;
    return (
        <div>
            <AnswersheetRenderer
                ref={ref}
                markdown={yourMarkdown}
                onSubmit={async (answers) => {
                    // 提交逻辑
                }}
                id={"answersheet"} />
            <Button
                onClick={() => ref.current?.submit()}
            >
                Submit Answers
            </Button>
        </div>
    );
}