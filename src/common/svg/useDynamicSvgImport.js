import { useEffect, useRef, useState } from 'react';

const icons = import.meta.glob('@common/assets/icons/*.svg', { import: 'default', eager: true, as: 'raw' });

export const useDynamicSvgImport = (name, options = {}) => {
  const ImportedIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        console.log('icons:', icons);
        ImportedIconRef.current = await import(`@common/assets/icons/${name}.svg?import&raw&react`).default;

        console.log('import:', ImportedIconRef.current);
        if (onCompleted) {
          onCompleted(name, ImportedIconRef.current);
        }
      } catch (err) {
        if (onError) {
          onError(err);
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, SvgIcon: ImportedIconRef.current };
};
