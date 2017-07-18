(() => {
const rules = [];

('table.rule-list').each((index, list) => {
    const block = {
        header: $(list).prev().prev().text(),
        rules: []
    };

    $(list).find('tr').each((index, item) => {
        const cols = $(item).find('td');
        const name = cols.eq(2).find('a');
        const desc = cols.eq(3).find('p');
        
        block.rules.push({
            name: name.text(),
            desc: desc.text()
        });
    });
    
    rules.push(block);
});

const maxNameLength = rules.reduce((max, block) => {
    return block.rules.reduce((m, rule) => {
        return m > rule.name.length ? m : rule.name.length;
    }, max)
}, 0);

copy(
    rules.reduce((content, block) => {
        content += `\n/**\n * === ${ block.header }\n */\n\n`;
        
        return block.rules.reduce((text, rule) => {
            const countAlignSpaces = maxNameLength - rule.name.length;
            const alignSpaces = Array.apply([], new Array(countAlignSpaces)).map(() => ' ').join('');
            
            return text += `"${ rule.name }": "off", ${ alignSpaces }// ${ rule.desc }\n`;
        }, content)
    }, '')
)
})();
