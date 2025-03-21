import menuIcon from "../image/menuIcon.svg";
import PropTypes from 'prop-types';
import './svg.acess.css'
interface Icon {
    name: string,
}

export const Icon = (icon: Icon) => (
    <svg className={'svg'}>
        <use xlinkHref={`${menuIcon}#${icon.name}`} />
    </svg>
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
};