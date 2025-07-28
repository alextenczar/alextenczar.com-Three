import React from 'react';

const TechnicalSkills = ({ text }) => {

    const skills = [
        { name: "i18n", url: "https://en.wikipedia.org/wiki/Internationalization_and_localization" },
        { name: "SEO", url: "https://developer.mozilla.org/en-US/docs/Glossary/SEO" },
        { name: "REST", url: "https://www.redhat.com/en/topics/api/what-is-a-rest-api#rest" },
        { name: "Gulp", url: "https://gulpjs.com/" },
        { name: "WebPack", url: "https://webpack.js.org/" },
        { name: "Jira", url: "https://www.atlassian.com/software/jira" },
        { name: "Drupal", url: "https://www.drupal.org/" },
        { name: "WordPress", url: "https://wordpress.org/" },
        { name: "Git", url: "https://git-scm.com/" },
        { name: "Linux", url: "https://www.redhat.com/en/topics/linux/what-is-linux" },
        { name: "AWS", url: "https://aws.amazon.com/" },
        { name: "GCP", url: "https://cloud.google.com/" },
        { name: "Docker", url: "https://www.docker.com/" },
        { name: "Apache", url: "https://httpd.apache.org/" },
        { name: "GraphQL", url: "https://graphql.org/" },
        { name: "NoSQL", url: "https://en.wikipedia.org/wiki/NoSQL" },
        { name: "MySQL", url: "https://www.mysql.com/" },
        { name: "MongoDB", url: "https://www.mongodb.com/" },
        { name: "Node", url: "https://nodejs.org/" },
        { name: "Django", url: "https://www.djangoproject.com/" },
        { name: "Three.js", url: "https://threejs.org/" },
        { name: "D3.js", url: "https://d3js.org/" },
        { name: "Express", url: "https://expressjs.com/" },
        { name: "React.js", url: "https://react.dev/" },
        { name: "Next.js", url: "https://nextjs.org/" },
        { name: "Bash", url: "https://www.gnu.org/software/bash/" },
        { name: "Python", url: "https://www.python.org/" },
        { name: "Java", url: "https://www.java.com/" },
        { name: "PHP", url: "https://www.php.net/" },
        { name: "TypeScript", url: "https://www.typescriptlang.org/" },
        { name: "JavaScript", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
        { name: "Tailwind", url: "https://tailwindcss.com/" },
        { name: "SASS", url: "https://sass-lang.com/" },
        { name: "CSS3", url: "https://developer.mozilla.org/docs/Web/CSS" },
        { name: "HTML5", url: "https://developer.mozilla.org/docs/Web/HTML" }
    ];

    const skillLinks = skills.map(skill => (
        <span><a
            key={skill.name}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 underline hover:text-blue-500"
        >
            {skill.name}
        </a>&nbsp;</span>
    ));

    return (
        <div className='outer-scroll-container uppercase flex flex-col justify-center h-full'>
            <div className="scroll text2">
                <div>
                    &nbsp;{skillLinks}&nbsp;{skillLinks}
                </div>
                <div>
                    &nbsp;{skillLinks}&nbsp;{skillLinks}
                </div>
            </div>
            <div className="scroll text2 left-right">
                <div>
                    &nbsp;{skillLinks}&nbsp;{skillLinks}
                </div>
                <div>
                    &nbsp;{skillLinks}&nbsp;{skillLinks}
                </div>
            </div>
            <div className="scroll text2">
                <div>
                    &nbsp;{skillLinks}&nbsp;{skillLinks}
                </div>
                <div>
                    &nbsp;{skillLinks}&nbsp;{skillLinks}
                </div>
            </div>
        </div>
    );
};

export default TechnicalSkills;
