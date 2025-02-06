import { div, button, label, option, select } from '@/utils/createElement';
import { Events } from '@/utils/eventEmitter';

import styles from './puzzlesMenuPanel.module.css';

/** @typedef {import('@/types/types').EventEmitter} EventEmitter */
/** @typedef {import('@/types/types').Template} Template */

const SIZES = [
  { value: 5, label: 'Easy' },
  { value: 10, label: 'Medium' },
  { value: 15, label: 'Hard' },
];

const INITIAL_SIZE = 5;

/**
 * @param {Template[]} templates
 * @param {EventEmitter} emitter
 */
function createPuzzleMenu(templates, emitter) {
  const levelsContainer = div({ className: styles.levels });
  levelsContainer.classList.add('panel');

  const labelElement = label({
    className: styles.label,
    innerText: 'Choose puzzle: ',
  });
  labelElement.setAttribute('for', 'sizeSelect');
  levelsContainer.appendChild(labelElement);

  const sizeSelectElement = select({
    className: styles.select,
    id: 'sizeSelect',
  });

  SIZES.forEach((size) => {
    const optionElement = option({ value: size.value, innerText: size.label });
    sizeSelectElement.appendChild(optionElement);
  });

  levelsContainer.appendChild(sizeSelectElement);

  const templateSelectElement = select({
    className: styles.select,
  });


  // TODO change innerHTML to replaceChildren
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
      emitter.emit(Events.TEMPLATE_SELECTION, selectedTemplate);
    }
  });

  templateSelectElement.addEventListener('change', (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedTemplateName = event.target.value;

      const selectedTemplate = templates.find(
        (template) => template.name === selectedTemplateName
      );

      emitter.emit(Events.TEMPLATE_SELECTION, selectedTemplate);
    }
  });

  // TODO: change random logic
  function selectRandomTemplate() {
    const currentTemplateName = templateSelectElement.value;
    const randomSize = SIZES[Math.floor(Math.random() * SIZES.length)].value;

    sizeSelectElement.value = String(randomSize);

    updateTemplateNames(randomSize);

    const filteredTemplates = templates.filter(
      (template) => template.size === randomSize
    );
    const availableTemplates = filteredTemplates.filter(
      (template) => template.name !== currentTemplateName
    );

    const randomTemplate =
      availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
    templateSelectElement.value = randomTemplate.name;

    emitter.emit(Events.TEMPLATE_SELECTION, randomTemplate);
  }

  const randomGameButton = button({
    className: 'button',
    textContent: 'Random Game',
    onclick: selectRandomTemplate,
  });

  levelsContainer.appendChild(templateSelectElement);
  levelsContainer.appendChild(randomGameButton);

  /**
   *
   * @param {Template} template
   */
  function setMenuValues(template) {
    const { size, name } = template;
    sizeSelectElement.value = size.toString();
    updateTemplateNames(size);
    templateSelectElement.value = name;
  }

  return { setMenuValues, levelsContainer };
}

export default createPuzzleMenu;
