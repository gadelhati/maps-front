import { useState } from 'react';
import { User, Lock, Shield, Eye, EyeOff } from 'lucide-react';

// Estilos para a página de login com tema escuro e labels centralizadas
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#121212',
    fontFamily: 'Arial, sans-serif'
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    margin: '0 1rem'
  },
  header: {
    textAlign: 'center'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginTop: '1.5rem'
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    marginTop: '0.5rem'
  },
  formContainer: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formField: {
    position: 'relative',
    marginBottom: '0.5rem'
  },
  iconLeft: {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    zIndex: 2
  },
  iconRight: {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    cursor: 'pointer',
    zIndex: 2
  },
  input: {
    width: '100%',
    padding: '1rem 2.5rem',
    fontSize: '1rem',
    color: '#e2e8f0',
    backgroundColor: '#2d3748',
    border: '1px solid #4a5568',
    borderRadius: '0.5rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  },
  focusedInput: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)'
  },
  labelContainer: {
    // backgroundColor: 'red',
    // padding: '2rem',
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none'
  },
  label: {
    color: '#9ca3af',
    transition: 'all 0.2s ease',
    backgroundColor: 'transparent',
    padding: '0 0.25rem',
    fontSize: '1rem',
    textAlign: 'center',
    maxWidth: 'calc(100% - 5rem)',
    zIndex: 1
  },
  floatingLabel: {
    fontSize: '0.75rem',
    color: '#60a5fa',
    transform: 'translateY(-0.5rem)'
  },
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '0.75rem 1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: '500',
    fontSize: '0.875rem',
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.2s'
  },
  buttonHover: {
    backgroundColor: '#2563eb'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem'
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center'
  },
  checkbox: {
    width: '1rem',
    height: '1rem',
    accentColor: '#3b82f6'
  },
  checkboxLabel: {
    marginLeft: '0.5rem',
    fontSize: '0.875rem',
    color: '#e2e8f0'
  },
  forgotPassword: {
    fontSize: '0.875rem',
    color: '#60a5fa',
    textDecoration: 'none',
    fontWeight: '500'
  },
  forgotPasswordHover: {
    color: '#93c5fd',
    textDecoration: 'underline'
  },
  // Estilos para quando o input tem valor
  hasValueInput: {
    color: '#e2e8f0'
  }
} as const;

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [totpKey, setTotpKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringForgot, setIsHoveringForgot] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password, totpKey });
    // Aqui você conectaria à sua API de autenticação
  };

  // Função para determinar a cor do ícone com base no estado do input
  const getIconColor = (inputName: any) => {
    return focusedInput === inputName ? '#60a5fa' : '#9ca3af';
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <h2 style={styles.title}>Login</h2>
          <p style={styles.subtitle}>Entre com suas credenciais</p>
        </div>
        
        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <div style={styles.formField}>
              <div style={styles.iconLeft}>
                <User size={20} color={getIconColor('username')} />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'username' ? styles.focusedInput : {}),
                  ...(username ? styles.hasValueInput : {})
                }}
                onFocus={() => setFocusedInput('username')}
                onBlur={() => setFocusedInput('')}
              />
              <div style={styles.labelContainer}>
                <span 
                  style={{
                    ...styles.label,
                    ...(focusedInput === 'username' || username ? styles.floatingLabel : {})
                  }}
                >
                  Nome de usuário
                </span>
              </div>
            </div>
            
            <div style={styles.formField}>
              <div style={styles.iconLeft}>
                <Lock size={20} color={getIconColor('password')} />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'password' ? styles.focusedInput : {}),
                  ...(password ? styles.hasValueInput : {})
                }}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput('')}
              />
              <div style={styles.labelContainer}>
                <span 
                  style={{
                    ...styles.label,
                    ...(focusedInput === 'password' || password ? styles.floatingLabel : {})
                  }}
                >
                  Senha
                </span>
              </div>
              <div 
                style={styles.iconRight}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 
                  <EyeOff size={20} color={getIconColor('password')} /> : 
                  <Eye size={20} color={getIconColor('password')} />
                }
              </div>
            </div>
            
            <div style={styles.formField}>
              <div style={styles.iconLeft}>
                <Shield size={20} color={getIconColor('totpKey')} />
              </div>
              <input
                id="totpKey"
                name="totpKey"
                type="text"
                required
                value={totpKey}
                onChange={(e) => setTotpKey(e.target.value)}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'totpKey' ? styles.focusedInput : {}),
                  ...(totpKey ? styles.hasValueInput : {})
                }}
                maxLength={6}
                onFocus={() => setFocusedInput('totpKey')}
                onBlur={() => setFocusedInput('')}
              />
              <div style={styles.labelContainer}>
                <span 
                  style={{
                    ...styles.label,
                    ...(focusedInput === 'totpKey' || totpKey ? styles.floatingLabel : {})
                  }}
                >
                  Código de autenticação
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              style={{
                ...styles.button,
                ...(isHoveringButton ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
            >
              Entrar
            </button>
          </div>
          
          <div style={styles.footer}>
            <div style={styles.rememberMe}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                style={styles.checkbox}
              />
              <label htmlFor="remember-me" style={styles.checkboxLabel}>
                Lembrar-me
              </label>
            </div>

            <a 
              href="#" 
              style={{
                ...styles.forgotPassword,
                ...(isHoveringForgot ? styles.forgotPasswordHover : {})
              }}
              onMouseEnter={() => setIsHoveringForgot(true)}
              onMouseLeave={() => setIsHoveringForgot(false)}
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}