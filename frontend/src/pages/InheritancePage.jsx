import KnowledgeCheckpoint from '../components/KnowledgeCheckpoint';

const CODE_ANIMAL = `// Superclass
public class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat() {
        System.out.println(name + " is eating.");
    }

    public String describe() {
        return name + ", age " + age;
    }
}`;

const CODE_DOG = `// Subclass — inherits from Animal
public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);   // invoke the parent constructor
        this.breed = breed;
    }

    public void bark() {
        System.out.println(name + " says: Woof!");
    }

    @Override
    public String describe() {
        return super.describe() + " (" + breed + ")";
    }
}`;

const CODE_USAGE = `Dog rex = new Dog("Rex", 3, "German Shepherd");

rex.eat();                         // inherited from Animal
rex.bark();                        // defined in Dog
System.out.println(rex.describe()); // overridden version runs

// Output:
// Rex is eating.
// Rex says: Woof!
// Rex, age 3 (German Shepherd)`;

const CODE_SUPER_METHOD = `public class Cat extends Animal {
    public Cat(String name, int age) {
        super(name, age);
    }

    @Override
    public String describe() {
        // Call the parent version, then extend it
        return super.describe() + " [cat]";
    }
}`;

export default function InheritancePage() {
  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <div className="lesson-header-inner">
          <span className="course-label">Java OOP Fundamentals</span>
          <nav className="lesson-nav">
            <span className="nav-item nav-item-active">1. Inheritance</span>
            <span className="nav-sep">›</span>
            <a className="nav-item" href="/polymorphism">2. Polymorphism</a>
          </nav>
        </div>
      </header>

      <main className="lesson-main">
        <div className="lesson-container">
          <div className="lesson-intro">
            <h1 className="lesson-title">Inheritance</h1>
            <p className="lesson-lead">
              Inheritance lets one class acquire the fields and methods of another, establishing a
              parent–child relationship between types. It is the mechanism that allows you to model
              natural hierarchies in code and build on existing work without duplication.
            </p>
          </div>

          {/* Section 1 */}
          <section className="lesson-section">
            <h2 className="section-title">The IS-A Relationship</h2>
            <p>
              Inheritance models an <em>IS-A</em> relationship. A <code>Dog</code> IS-A{' '}
              <code>Animal</code>. A <code>SavingsAccount</code> IS-A <code>BankAccount</code>. When
              that sentence reads naturally, inheritance is likely the right tool.
            </p>
            <p>
              The class being inherited from is the <strong>superclass</strong> (also called the
              parent class or base class). The class doing the inheriting is the{' '}
              <strong>subclass</strong> (child class or derived class). The subclass automatically
              gains all non-private members of the superclass and can add its own on top.
            </p>
            <div className="callout callout-info">
              <strong>When not to use inheritance:</strong> If you can only say "has-a" rather than
              "is-a", prefer composition. A <code>Car</code> HAS-A <code>Engine</code> — that
              should be a field, not a superclass.
            </div>
          </section>

          {/* Section 2 */}
          <section className="lesson-section">
            <h2 className="section-title">Java Syntax: extends</h2>
            <p>
              Java uses the <code>extends</code> keyword to declare a subclass. Here,{' '}
              <code>Animal</code> defines common state and behavior:
            </p>
            <div className="code-block-wrapper">
              <span className="code-lang">Java</span>
              <pre className="code-block"><code>{CODE_ANIMAL}</code></pre>
            </div>
            <p>
              <code>Dog</code> extends <code>Animal</code>, inheriting <code>name</code>,{' '}
              <code>age</code>, <code>eat()</code>, and <code>describe()</code>, while adding its
              own <code>breed</code> field and <code>bark()</code> method:
            </p>
            <div className="code-block-wrapper">
              <span className="code-lang">Java</span>
              <pre className="code-block"><code>{CODE_DOG}</code></pre>
            </div>
            <div className="code-block-wrapper">
              <span className="code-lang">Usage</span>
              <pre className="code-block"><code>{CODE_USAGE}</code></pre>
            </div>
          </section>

          {/* Section 3 */}
          <section className="lesson-section">
            <h2 className="section-title">What Is (and Isn't) Inherited</h2>
            <div className="info-grid">
              <div className="info-card info-card-yes">
                <h3>Inherited</h3>
                <ul>
                  <li>Public fields and methods</li>
                  <li>Protected fields and methods</li>
                  <li>Package-private members (same package)</li>
                </ul>
              </div>
              <div className="info-card info-card-no">
                <h3>Not Inherited</h3>
                <ul>
                  <li>Private fields and methods</li>
                  <li>Constructors</li>
                  <li>Static members (shared, not instance-specific)</li>
                </ul>
              </div>
            </div>
            <p>
              Private members still exist inside the object's memory — they just cannot be accessed
              by name in the subclass. The parent class's own public/protected methods can still
              read and write them, which is the correct way to interact with them.
            </p>
          </section>

          {/* Section 4 */}
          <section className="lesson-section">
            <h2 className="section-title">The super Keyword</h2>
            <p>
              <code>super</code> has two distinct uses inside a subclass:
            </p>
            <div className="two-col">
              <div className="two-col-item">
                <h3 className="sub-heading">Calling the parent constructor</h3>
                <p>
                  <code>super(args)</code> must be the <em>first statement</em> in a subclass
                  constructor. It ensures the parent's initialization logic runs before the child
                  adds its own. If you omit it, Java inserts <code>super()</code> automatically —
                  which fails if the parent has no no-argument constructor.
                </p>
              </div>
              <div className="two-col-item">
                <h3 className="sub-heading">Calling a parent method</h3>
                <p>
                  <code>super.methodName()</code> calls the parent class's version of a method from
                  within an overriding method. This lets you extend, rather than completely replace,
                  the parent behavior.
                </p>
              </div>
            </div>
            <div className="code-block-wrapper">
              <span className="code-lang">Java</span>
              <pre className="code-block"><code>{CODE_SUPER_METHOD}</code></pre>
            </div>
          </section>

          {/* Section 5 */}
          <section className="lesson-section">
            <h2 className="section-title">Single Inheritance and java.lang.Object</h2>
            <p>
              Java enforces <strong>single inheritance</strong> for classes: a class can extend only
              one other class. This prevents the ambiguity of the "diamond problem" found in
              languages that allow multiple inheritance.
            </p>
            <p>
              At the top of every inheritance hierarchy sits <code>java.lang.Object</code>. Every
              class implicitly extends <code>Object</code> if no superclass is declared explicitly.
              This is why all Java objects share methods like <code>toString()</code>,{' '}
              <code>equals()</code>, and <code>hashCode()</code> — they are inherited from{' '}
              <code>Object</code>.
            </p>
            <div className="hierarchy-diagram">
              <div className="hierarchy-node hierarchy-root">java.lang.Object</div>
              <div className="hierarchy-children">
                <div className="hierarchy-branch">
                  <div className="hierarchy-node">Animal</div>
                  <div className="hierarchy-children">
                    <div className="hierarchy-branch">
                      <div className="hierarchy-node hierarchy-leaf">Dog</div>
                    </div>
                    <div className="hierarchy-branch">
                      <div className="hierarchy-node hierarchy-leaf">Cat</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Points */}
          <section className="lesson-section">
            <h2 className="section-title">Key Points</h2>
            <ul className="key-points">
              <li>
                Use <code>extends</code> to declare a subclass; it inherits all non-private members
                of the superclass.
              </li>
              <li>
                Always call <code>super()</code> first in a subclass constructor to initialize the
                parent's state.
              </li>
              <li>
                Override a method to specialize behavior; use <code>@Override</code> to let the
                compiler verify the signature.
              </li>
              <li>Java allows only single inheritance for classes.</li>
              <li>
                Every class ultimately extends <code>java.lang.Object</code>.
              </li>
            </ul>
          </section>
        </div>

        <div className="checkpoint-wrapper">
          <div className="lesson-container">
            <KnowledgeCheckpoint
              topicId="inheritance"
              nextPath="/polymorphism"
              nextLabel="Polymorphism"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
