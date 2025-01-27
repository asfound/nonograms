import { div, label, option, select } from '@/utils/createElement';

const sizes = [
  { value: 5, label: 'Easy' },
  { value: 10, label: 'Medium' },
  { value: 15, label: 'Hard' },
];

const INITIAL_SIZE = 5;

/**
 * @param {Array<{ name: string, icon: string, size: number, matrix: number[][] }>} templates
 * @param {import('@/utils/eventEmitter').EventEmitter} emitter
 * @returns  {HTMLElement} levelsContainer
 */
function createPuzzleMenu(templates, emitter) {
  const levelsContainer = div({ className: 'levels' });

  const labelElement = label({
    className: 'label',
    innerText: 'Choose puzzle: ',
  });
  labelElement.setAttribute('for', 'sizeSelect');
  levelsContainer.appendChild(labelElement);

  const sizeSelectElement = select({
    className: 'select size',
    id: 'sizeSelect',
  });

  sizes.forEach((size) => {
    const optionElement = option({ value: size.value, innerText: size.label });
    sizeSelectElement.appendChild(optionElement);
  });

  levelsContainer.appendChild(sizeSelectElement);

  const templateSelectElement = select({
    className: 'select template',
  });

  /** @param {number} selectedSize */
  const updateTemplateNames = (selectedSize) => {
    templateSelectElement.innerHTML = '';

    const filteredTemplates = templates.filter(
      (template) => template.size === selectedSize
    );
    filteredTemplates.forEach((template) => {
      const optionElement = option({
        value: template.name,
        innerText: template.name,
      });
      templateSelectElement.appendChild(optionElement);
    });
  };

  updateTemplateNames(INITIAL_SIZE);

  sizeSelectElement.addEventListener('change', (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedSize = Number(event.target.value);
      updateTemplateNames(selectedSize);

      const selectedTemplate = templates.find(
        (template) => template.size === selectedSize
      );
      emitter.emit('templateSelected', selectedTemplate);
    }
  });

  templateSelectElement.addEventListener('change', (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedTemplateName = event.target.value;

      const selectedTemplate = templates.find(
        (template) => template.name === selectedTemplateName
      );

      emitter.emit('templateSelected', selectedTemplate);
    }
  });

  levelsContainer.appendChild(templateSelectElement);

  return levelsContainer;
}

export default createPuzzleMenu;
