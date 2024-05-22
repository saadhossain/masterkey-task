function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function createControls(partition) {
    const controls = document.createElement('div');
    controls.className = 'controls';

    const vButton = document.createElement('div');
    vButton.className = 'button';
    vButton.innerText = 'V';
    vButton.addEventListener('click', () => splitPartition(partition, 'vertical'));

    const hButton = document.createElement('div');
    hButton.className = 'button';
    hButton.innerText = 'H';
    hButton.addEventListener('click', () => splitPartition(partition, 'horizontal'));

    const removeButton = document.createElement('div');
    removeButton.className = 'button';
    removeButton.innerText = '-';
    removeButton.addEventListener('click', () => partition.remove());

    controls.appendChild(vButton);
    controls.appendChild(hButton);
    controls.appendChild(removeButton);

    return controls;
}

function createResizer(partition) {
    const verticalResizer = document.createElement('div');
    verticalResizer.className = 'resizer vertical';
    verticalResizer.addEventListener('mousedown', initResize);

    const horizontalResizer = document.createElement('div');
    horizontalResizer.className = 'resizer horizontal';
    horizontalResizer.addEventListener('mousedown', initResize);

    partition.appendChild(verticalResizer);
    partition.appendChild(horizontalResizer);

    function initResize(e) {
        const isVertical = e.target.classList.contains('vertical');
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = parseInt(document.defaultView.getComputedStyle(partition).width, 10);
        const startHeight = parseInt(document.defaultView.getComputedStyle(partition).height, 10);

        window.addEventListener('mousemove', doResize);
        window.addEventListener('mouseup', stopResize);

        function doResize(event) {
            if (isVertical) {
                partition.style.width = (startWidth + event.clientX - startX) + 'px';
            } else {
                partition.style.height = (startHeight + event.clientY - startY) + 'px';
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', doResize);
            window.removeEventListener('mouseup', stopResize);
        }
    }
}

function splitPartition(partition, direction) {
    const newPartition = document.createElement('div');
    newPartition.className = 'partition';
    newPartition.style.backgroundColor = getRandomColor();

    if (direction === 'vertical') {
        partition.style.width = '50%';
        partition.style.float = 'left';
        newPartition.style.width = '50%';
        newPartition.style.height = '100%';
        newPartition.style.float = 'left';
    } else {
        partition.style.height = '50%';
        newPartition.style.height = '50%';
        newPartition.style.width = '100%';
    }

    newPartition.appendChild(createControls(newPartition));
    createResizer(partition);
    createResizer(newPartition);
    partition.parentElement.appendChild(newPartition);
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    container.style.backgroundColor = getRandomColor();
    container.appendChild(createControls(container));
    createResizer(container);
});